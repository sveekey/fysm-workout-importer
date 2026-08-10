import {
  FuzzySuggestModal,
  Modal,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
  normalizePath
} from "obsidian";
import { parseWorkoutText, WorkoutParseError } from "./parser.js";
import { buildWorkoutMarkdown } from "./markdown.js";
import { listMaterialFiles, resolveWorkoutMaterials } from "./library.js";

const DEFAULT_SETTINGS = {
  libraryFolder: "FYSM/Методички",
  workoutsFolder: "FYSM/Тренировки",
  materialMap: {}
};

function cleanFolderPath(value, fallback) {
  const normalized = normalizePath(String(value || "").trim().replace(/^\/+|\/+$/g, ""));
  return normalized || fallback;
}

function safeFileName(value = "") {
  const cleaned = String(value)
    .replace(/[\\/:*?"<>|#[\]^]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned.slice(0, 100) || "Тренировка FYSM";
}

function getImportedFileExtension(file) {
  const fromName = String(file?.name || "").match(/\.([a-z0-9]+)$/iu)?.[1]?.toLocaleLowerCase("en") || "";
  const supported = new Set(["png", "jpg", "jpeg", "webp", "gif", "pdf"]);
  if (supported.has(fromName)) return fromName;
  const byMime = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
    "image/gif": "gif",
    "application/pdf": "pdf"
  };
  return byMime[String(file?.type || "").toLocaleLowerCase("en")] || "";
}

async function ensureFolder(vault, folderPath) {
  const normalized = normalizePath(folderPath);
  const parts = normalized.split("/").filter(Boolean);
  let current = "";
  for (const part of parts) {
    current = current ? `${current}/${part}` : part;
    if (!vault.getAbstractFileByPath(current)) {
      try {
        await vault.createFolder(current);
      } catch (error) {
        if (!vault.getAbstractFileByPath(current)) throw error;
      }
    }
  }
}

class MaterialFileSuggestModal extends FuzzySuggestModal {
  constructor(app, files, onChoose) {
    super(app);
    this.files = files;
    this.onChoose = onChoose;
    this.setPlaceholder("Выберите локальный скриншот или PDF…");
  }

  getItems() {
    return this.files;
  }

  getItemText(file) {
    return file.path;
  }

  onChooseItem(file) {
    this.onChoose(file);
  }
}

class WorkoutImportModal extends Modal {
  constructor(app, plugin, initialText = "") {
    super(app);
    this.plugin = plugin;
    this.inputText = initialText;
    this.workout = null;
    this.resolution = null;
    this.resultEl = null;
    this.createSetting = null;
    this.creating = false;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.addClass("fysm-import-modal");
    contentEl.createEl("h2", { text: "Собрать тренировку FYSM" });
    contentEl.createEl("p", {
      text: "Вставьте целиком сообщение сформированной тренировки из Telegram. Обработка выполняется только внутри этого хранилища."
    });

    const textArea = contentEl.createEl("textarea", {
      cls: "fysm-import-textarea",
      attr: { placeholder: "Вставьте сообщение тренировки…" }
    });
    textArea.value = this.inputText;
    textArea.addEventListener("input", () => {
      this.inputText = textArea.value;
      this.workout = null;
      this.resolution = null;
      this.resultEl.empty();
      this.createSetting?.settingEl.remove();
      this.createSetting = null;
    });

    new Setting(contentEl)
      .addButton(button => button
        .setButtonText("Проверить материалы")
        .setCta()
        .onClick(() => this.preview()));

    this.resultEl = contentEl.createDiv({ cls: "fysm-import-results" });
    if (this.inputText.trim()) this.preview();
  }

  preview() {
    this.resultEl.empty();
    this.createSetting?.settingEl.remove();
    this.createSetting = null;
    try {
      this.workout = parseWorkoutText(this.inputText);
      this.resolution = resolveWorkoutMaterials(this.app, this.workout, this.plugin.settings);
    } catch (error) {
      const message = error instanceof WorkoutParseError ? error.message : `Не удалось разобрать тренировку: ${error.message}`;
      this.resultEl.createDiv({ cls: "fysm-status fysm-status-error", text: message });
      return;
    }

    this.resultEl.createEl("h3", { text: this.workout.title });
    const found = this.resolution.matches.size;
    const total = this.workout.requiredMaterials.length;
    this.resultEl.createDiv({
      cls: `fysm-status ${this.resolution.missing.length ? "fysm-status-warning" : "fysm-status-success"}`,
      text: total ? `Материалы: найдено ${found} из ${total}.` : "Для этой тренировки отдельные схемы не требуются."
    });

    if (this.resolution.missing.length) {
      const item = this.resolution.missing[0];
      const description = item.reason === "ambiguous"
        ? `В папке «${item.expectedFolder}» найдено несколько похожих файлов — выберите нужный.`
        : `Файл не найден в папке «${item.expectedFolder}».`;
      const wizardEl = this.resultEl.createDiv({ cls: "fysm-material-wizard" });
      wizardEl.createDiv({
        cls: "fysm-material-progress",
        text: `Следующий материал · осталось ${this.resolution.missing.length}`
      });
      new Setting(wizardEl)
        .setName(`Добавьте «${item.requirement.displayName}»`)
        .setDesc(`${description} После выбора плагин сам назовёт и сохранит копию файла.`)
        .addButton(button => button
          .setButtonText("Фото / Файлы")
          .setCta()
          .onClick(() => this.pickMaterialFromDevice(item, button)))
        .addButton(button => button
          .setButtonText("Уже в vault")
          .onClick(() => {
            const files = listMaterialFiles(this.app, item.expectedFolder);
            if (!files.length) {
              new Notice(`В папке «${item.expectedFolder}» пока нет изображений или PDF.`);
              return;
            }
            new MaterialFileSuggestModal(this.app, files, async file => {
              this.plugin.settings.materialMap[item.requirement.id] = file.path;
              await this.plugin.saveSettings();
              this.preview();
            }).open();
          }));

      if (this.resolution.missing.length > 1) {
        wizardEl.createEl("details", {}, details => {
          details.createEl("summary", { text: "Показать остальные недостающие материалы" });
          const list = details.createEl("ul");
          this.resolution.missing.slice(1).forEach(missing => {
            list.createEl("li", { text: `${missing.requirement.displayName} → ${missing.expectedFolder}` });
          });
        });
      }
    }

    this.createSetting = new Setting(this.contentEl)
      .setDesc(this.resolution.missing.length
        ? "Заметку можно создать сейчас: на месте отсутствующих схем появятся предупреждения."
        : "Все необходимые локальные материалы найдены.")
      .addButton(button => button
        .setButtonText(this.resolution.missing.length ? "Создать с предупреждениями" : "Создать тренировку")
        .setCta()
        .onClick(async () => {
          if (this.creating) return;
          this.creating = true;
          button.setDisabled(true);
          try {
            const file = await this.plugin.createWorkoutNote(this.workout, this.resolution);
            new Notice(`Тренировка создана: ${file.path}`);
            this.close();
          } catch (error) {
            new Notice(`Не удалось создать тренировку: ${error.message}`);
            button.setDisabled(false);
          } finally {
            this.creating = false;
          }
        }));
  }

  pickMaterialFromDevice(item, button) {
    const input = this.contentEl.doc.createElement("input");
    input.type = "file";
    input.accept = "image/png,image/jpeg,image/webp,image/gif,application/pdf";
    input.className = "fysm-hidden-file-input";
    this.contentEl.appendChild(input);
    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      input.remove();
      if (!file) return;
      button.setDisabled(true);
      try {
        const created = await this.plugin.importMaterialFromDevice(item.requirement, item.expectedFolder, file);
        new Notice(`Материал сохранён: ${created.path}`);
        this.preview();
      } catch (error) {
        new Notice(`Не удалось добавить материал: ${error.message}`);
        button.setDisabled(false);
      }
    }, { once: true });
    input.click();
  }

  onClose() {
    this.contentEl.empty();
  }
}

class FysmWorkoutSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "FYSM Workout Importer" });
    containerEl.createEl("p", {
      text: "Плагин работает локально. Он не подключается к Telegram и не отправляет содержимое хранилища наружу."
    });

    new Setting(containerEl)
      .setName("Папка с методичками")
      .setDesc("Плагин ищет изображения и PDF только внутри этой папки.")
      .addText(text => text
        .setPlaceholder(DEFAULT_SETTINGS.libraryFolder)
        .setValue(this.plugin.settings.libraryFolder)
        .onChange(async value => {
          this.plugin.settings.libraryFolder = cleanFolderPath(value, DEFAULT_SETTINGS.libraryFolder);
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName("Папка готовых тренировок")
      .setDesc("Сюда будут записываться созданные Markdown-заметки.")
      .addText(text => text
        .setPlaceholder(DEFAULT_SETTINGS.workoutsFolder)
        .setValue(this.plugin.settings.workoutsFolder)
        .onChange(async value => {
          this.plugin.settings.workoutsFolder = cleanFolderPath(value, DEFAULT_SETTINGS.workoutsFolder);
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName("Создать папки")
      .setDesc("Создаёт папки, если их ещё нет. Существующие файлы не изменяются.")
      .addButton(button => button
        .setButtonText("Создать")
        .onClick(async () => {
          await ensureFolder(this.app.vault, this.plugin.settings.libraryFolder);
          await Promise.all(["FYSM 1", "FYSM 2", "FYSM 3", "ZERO", "ON", "SURYA"].map(folder =>
            ensureFolder(this.app.vault, `${this.plugin.settings.libraryFolder}/${folder}`)
          ));
          await ensureFolder(this.app.vault, this.plugin.settings.workoutsFolder);
          new Notice("Папки FYSM готовы.");
        }));

    new Setting(containerEl)
      .setName("Сбросить ручные соответствия")
      .setDesc("Забывает выбранные вручную пары «алгоритм → файл», но не удаляет сами файлы.")
      .addButton(button => button
        .setButtonText("Сбросить")
        .setWarning()
        .onClick(async () => {
          this.plugin.settings.materialMap = {};
          await this.plugin.saveSettings();
          new Notice("Ручные соответствия сброшены. Файлы не изменялись.");
        }));
  }
}

export default class FysmWorkoutImporterPlugin extends Plugin {
  async onload() {
    await this.loadSettings();

    this.addRibbonIcon("clipboard-paste", "Собрать тренировку FYSM", () => this.openImporterFromClipboard());
    this.addCommand({
      id: "import-workout-from-clipboard",
      name: "Собрать тренировку из буфера обмена",
      callback: () => this.openImporterFromClipboard()
    });
    this.addCommand({
      id: "open-workout-importer",
      name: "Открыть импортёр тренировки",
      callback: () => new WorkoutImportModal(this.app, this, "").open()
    });
    this.addSettingTab(new FysmWorkoutSettingTab(this.app, this));
  }

  async loadSettings() {
    const loaded = await this.loadData();
    this.settings = {
      ...DEFAULT_SETTINGS,
      ...(loaded || {}),
      materialMap: { ...DEFAULT_SETTINGS.materialMap, ...(loaded?.materialMap || {}) }
    };
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async openImporterFromClipboard() {
    let clipboardText = "";
    try {
      clipboardText = await navigator.clipboard.readText();
    } catch {
      // Mobile platforms and some desktop permission settings disallow clipboard reads.
    }
    new WorkoutImportModal(this.app, this, clipboardText).open();
    if (!clipboardText) new Notice("Вставьте скопированное сообщение в открывшееся поле.");
  }

  async createWorkoutNote(workout, resolution) {
    const outputFolder = cleanFolderPath(this.settings.workoutsFolder, DEFAULT_SETTINGS.workoutsFolder);
    await ensureFolder(this.app.vault, outputFolder);

    const prefix = workout.date ? `${workout.date} — ` : "";
    const baseName = safeFileName(`${prefix}${workout.title}`);
    let notePath = normalizePath(`${outputFolder}/${baseName}.md`);
    let suffix = 2;
    while (this.app.vault.getAbstractFileByPath(notePath)) {
      notePath = normalizePath(`${outputFolder}/${baseName} (${suffix}).md`);
      suffix += 1;
    }

    const markdown = buildWorkoutMarkdown(workout, resolution, file => {
      const link = this.app.fileManager.generateMarkdownLink(file, notePath);
      return link.startsWith("!") ? link : `!${link}`;
    });
    const file = await this.app.vault.create(notePath, markdown);
    await this.app.workspace.getLeaf("tab").openFile(file);
    return file;
  }

  async importMaterialFromDevice(requirement, expectedFolder, sourceFile) {
    const extension = getImportedFileExtension(sourceFile);
    if (!extension) {
      throw new Error("Поддерживаются PNG, JPG, WebP, GIF и PDF.");
    }
    if (Number(sourceFile.size || 0) > 25 * 1024 * 1024) {
      throw new Error("Файл больше 25 МБ. Уменьшите изображение и попробуйте снова.");
    }

    await ensureFolder(this.app.vault, expectedFolder);
    const baseName = safeFileName(requirement.displayName);
    let targetPath = normalizePath(`${expectedFolder}/${baseName}.${extension}`);
    let suffix = 2;
    while (this.app.vault.getAbstractFileByPath(targetPath)) {
      targetPath = normalizePath(`${expectedFolder}/${baseName} (${suffix}).${extension}`);
      suffix += 1;
    }

    const data = await sourceFile.arrayBuffer();
    const created = await this.app.vault.createBinary(targetPath, data);
    this.settings.materialMap[requirement.id] = created.path;
    await this.saveSettings();
    return created;
  }
}
