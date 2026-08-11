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
import { YOGA_ALGORITHMS } from "./catalog.js";

const DEFAULT_SETTINGS = {
  libraryFolder: "Конструктор тренировок/Материалы",
  workoutsFolder: "Конструктор тренировок/Тренировки",
  materialMap: {}
};

const PLUGIN_VERSION = "0.10.0-beta.1";

function cleanFolderPath(value, fallback) {
  const normalized = normalizePath(String(value || "").trim().replace(/^\/+|\/+$/g, ""));
  return normalized || fallback;
}

function safeFileName(value = "") {
  const cleaned = String(value)
    .replace(/[\\/:*?"<>|#[\]^]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned.slice(0, 100) || "Тренировка Yoga";
}

function safeFolderName(value = "") {
  const cleaned = safeFileName(value).replace(/^\.+|\.+$/g, "").trim();
  return cleaned && cleaned !== "." && cleaned !== ".." ? cleaned : "";
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

function getTodayIsoDate() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function listSavedClientNames(app, workoutsFolder) {
  const folder = app.vault.getAbstractFileByPath(workoutsFolder);
  return (folder?.children || [])
    .filter(item => Array.isArray(item.children))
    .map(item => item.name)
    .filter(name => name && name !== "Себе")
    .sort((left, right) => left.localeCompare(right, "ru"));
}

function manualWorkoutTitle(warmup, algorithms) {
  const warmupPart = warmup.type === "zero"
    ? `ZERO ${warmup.sequence.join(", ")}${warmup.repetitions ? ` — ${warmup.repetitions}` : ""}`
    : `${warmup.name}${warmup.repetitions ? ` — ${warmup.repetitions}` : ""}`;
  const algorithmParts = algorithms.map(item => `${item.name}${item.mode ? ` — ${item.mode}` : ""}`);
  return [warmupPart, ...algorithmParts].filter(Boolean).join(", ") || "Тренировка Yoga";
}

function manualWorkoutText({ date, client, warmup, algorithms, title: titleOverride = "", metronome = "20", level = "", comment = "" }) {
  const title = String(titleOverride).trim() || manualWorkoutTitle(warmup, algorithms);
  const warmupText = warmup.type === "zero"
    ? `🥌 **ZERO** ( ${warmup.sequence.join(", ")} )${warmup.repetitions ? ` на **${warmup.repetitions}**` : ""}`
    : `${warmup.type === "surya" ? "☀️" : "🗿"} **${warmup.name}**${warmup.repetitions ? ` на **${warmup.repetitions}**` : ""}`;
  const setEmoji = { F1: "1️⃣", F2: "2️⃣", F3: "3️⃣", LITE: "⏺️" };
  const lines = [
    `**«${title}»**`,
    `• **Дата**: ${date}`,
    level ? `• **Уровень**: ${level}` : "",
    `• **Метроном**: ${metronome || "20"}`,
    `• **ON**: ${warmupText}`,
    "• **Алгоритмы**:"
  ];
  if (!lines[2]) lines.splice(2, 1);
  if (!algorithms.length) lines.push("нет");
  algorithms.forEach((item, index) => {
    lines.push(`${index + 1}) ${setEmoji[item.set] || ""} **${item.name}**${item.zone ? ` ${item.zone}` : ""}${item.mode ? ` — **${item.mode}**` : ""}`.trim());
  });
  if (client) lines.push(`• **Комментарий**: Клиент: ${client}`);
  else if (comment) lines.push(`• **Комментарий**: ${comment}`);
  return lines.join("\n");
}

function decodeBase64UrlJson(value = "") {
  const normalized = String(value || "").replace(/-/g, "+").replace(/_/g, "/");
  if (!normalized || !/^[A-Za-z0-9+/]*={0,2}$/u.test(normalized)) throw new Error("Неверный формат ссылки.");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

function handoffWorkoutText(encodedPayload = "") {
  const payload = decodeBase64UrlJson(encodedPayload);
  if (!payload || payload.v !== 1 || !payload.warmup || !Array.isArray(payload.algorithms)) {
    throw new Error("Ссылка на тренировку устарела или повреждена.");
  }

  const warmupType = ["zero", "static", "surya"].includes(payload.warmup.type) ? payload.warmup.type : "";
  const warmup = {
    type: warmupType,
    name: String(payload.warmup.name || (warmupType === "zero" ? "ZERO" : "")).trim(),
    sequence: Array.isArray(payload.warmup.sequence)
      ? payload.warmup.sequence.map(Number).filter(number => Number.isInteger(number) && number >= 0 && number <= 999)
      : [],
    repetitions: String(payload.warmup.repetitions || "").trim().slice(0, 30)
  };
  if (!warmup.type || !warmup.name || (warmup.type === "zero" && !warmup.sequence.length)) {
    throw new Error("В ссылке не найдено корректное включение.");
  }

  const algorithms = payload.algorithms.slice(0, 4).map(item => ({
    set: ["F1", "F2", "F3", "LITE"].includes(item?.set) ? item.set : "",
    name: String(item?.name || "").trim().slice(0, 100),
    zone: ["🔼", "🔽", "⏺️"].includes(item?.zone) ? item.zone : "",
    mode: String(item?.mode || "").trim().slice(0, 40)
  })).filter(item => item.name && item.set);
  if (algorithms.length !== payload.algorithms.length) throw new Error("В ссылке не найден один из алгоритмов.");

  return manualWorkoutText({
    title: String(payload.title || "").trim().slice(0, 100),
    date: String(payload.date || "").match(/\d{4}-\d{2}-\d{2}/u)?.[0] || getTodayIsoDate(),
    client: String(payload.client || "").trim().slice(0, 100),
    comment: String(payload.comment || "").trim().slice(0, 300),
    level: String(payload.level || "").trim().slice(0, 40),
    metronome: String(payload.metronome || "20").trim().slice(0, 20),
    warmup,
    algorithms
  });
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

class AlgorithmNameSuggestModal extends FuzzySuggestModal {
  constructor(app, names, onChoose) {
    super(app);
    this.names = names;
    this.onChoose = onChoose;
    this.setPlaceholder("Выберите алгоритм…");
  }

  getItems() {
    return this.names;
  }

  getItemText(name) {
    return name;
  }

  onChooseItem(name) {
    this.onChoose(name);
  }
}

class ManualWorkoutModal extends Modal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
    this.date = getTodayIsoDate();
    this.owner = "self";
    this.newClient = "";
    this.warmupType = "zero";
    this.zeroNumbers = "";
    this.warmupName = "ON 10";
    this.repetitions = "";
    this.algorithms = [];
  }

  onOpen() {
    this.contentEl.addClass("yoga-import-modal");
    this.render();
  }

  render() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: "Записать тренировку" });
    contentEl.createEl("p", { text: "Соберите тренировку по шагам. Все данные останутся в этом хранилище." });

    const clients = listSavedClientNames(this.app, this.plugin.settings.workoutsFolder);
    new Setting(contentEl)
      .setName("Для кого")
      .setDesc("«Себе» сохраняет заметку в одноимённую папку. Клиенты берутся из уже созданных папок тренировок.")
      .addDropdown(dropdown => {
        dropdown.addOption("self", "Себе");
        clients.forEach(name => dropdown.addOption(`client:${name}`, name));
        dropdown.addOption("new", "Новый клиент…");
        dropdown.setValue(this.owner).onChange(value => {
          this.owner = value;
          this.render();
        });
      });

    if (this.owner === "new") {
      new Setting(contentEl)
        .setName("Имя клиента")
        .addText(text => text
          .setPlaceholder("Например, Анна")
          .setValue(this.newClient)
          .onChange(value => { this.newClient = value; }));
    }

    new Setting(contentEl)
      .setName("Дата")
      .addText(text => text
        .setPlaceholder("ГГГГ-ММ-ДД")
        .setValue(this.date)
        .onChange(value => { this.date = value.trim(); }));

    new Setting(contentEl)
      .setName("Включение")
      .addDropdown(dropdown => dropdown
        .addOption("zero", "ZERO")
        .addOption("static", "ON / статика")
        .addOption("surya", "Сурья Намаскар")
        .setValue(this.warmupType)
        .onChange(value => {
          this.warmupType = value;
          if (value === "surya" && this.warmupName === "ON 10") this.warmupName = "Сурья Намаскар 1";
          this.render();
        }));

    if (this.warmupType === "zero") {
      new Setting(contentEl)
        .setName("Номера ZERO")
        .setDesc("Через запятую, например: 9, 3, 1.")
        .addText(text => text
          .setPlaceholder("9, 3, 1")
          .setValue(this.zeroNumbers)
          .onChange(value => { this.zeroNumbers = value; }));
    } else {
      new Setting(contentEl)
        .setName(this.warmupType === "surya" ? "Название Сурьи" : "Название ON")
        .addText(text => text
          .setValue(this.warmupName)
          .onChange(value => { this.warmupName = value; }));
    }

    new Setting(contentEl)
      .setName("Режим включения")
      .setDesc("Например: 4х8 или 8 кругов.")
      .addText(text => text
        .setPlaceholder("4х8")
        .setValue(this.repetitions)
        .onChange(value => { this.repetitions = value; }));

    contentEl.createEl("h3", { text: "Алгоритмы" });
    this.algorithms.forEach((algorithm, index) => this.renderAlgorithm(contentEl, algorithm, index));
    new Setting(contentEl)
      .addButton(button => button
        .setButtonText("Добавить алгоритм")
        .onClick(() => {
          this.algorithms.push({ set: "F1", name: "", zone: "", mode: "" });
          this.render();
        }));

    new Setting(contentEl)
      .setDesc("После этого плагин найдёт локальные схемы и по одной попросит только отсутствующие.")
      .addButton(button => button
        .setButtonText("Проверить материалы")
        .setCta()
        .onClick(() => this.openMaterialCheck()));
  }

  renderAlgorithm(container, algorithm, index) {
    const setting = new Setting(container).setName(`${index + 1}. ${algorithm.name || "Алгоритм"}`);
    setting.addDropdown(dropdown => dropdown
      .addOption("F1", "F1")
      .addOption("F2", "F2")
      .addOption("F3", "F3")
      .addOption("LITE", "LITE")
      .setValue(algorithm.set)
      .onChange(value => {
        algorithm.set = value;
        algorithm.name = "";
        this.render();
      }));
    setting.addButton(button => button
      .setButtonText(algorithm.name || "Выбрать")
      .onClick(() => new AlgorithmNameSuggestModal(this.app, YOGA_ALGORITHMS[algorithm.set] || [], name => {
        algorithm.name = name;
        this.render();
      }).open()));
    setting.addExtraButton(button => button
      .setIcon("trash")
      .setTooltip("Убрать алгоритм")
      .onClick(() => {
        this.algorithms.splice(index, 1);
        this.render();
      }));
    new Setting(container)
      .setDesc("Зона и режим")
      .addDropdown(dropdown => dropdown
        .addOption("", "Без зоны")
        .addOption("🔼", "🔼")
        .addOption("🔽", "🔽")
        .addOption("⏺️", "⏺️")
        .setValue(algorithm.zone)
        .onChange(value => { algorithm.zone = value; }))
      .addText(text => text
        .setPlaceholder("Режим: 1х8")
        .setValue(algorithm.mode)
        .onChange(value => { algorithm.mode = value; }));
  }

  openMaterialCheck() {
    const client = this.owner === "new"
      ? safeFolderName(this.newClient)
      : this.owner.startsWith("client:") ? this.owner.slice("client:".length) : "";
    const sequence = [...this.zeroNumbers.matchAll(/\d+/g)].map(match => Number.parseInt(match[0], 10));
    if (!/^\d{4}-\d{2}-\d{2}$/u.test(this.date)) return new Notice("Укажите дату в формате ГГГГ-ММ-ДД.");
    if (this.warmupType === "zero" && !sequence.length) return new Notice("Укажите хотя бы один номер ZERO.");
    if (this.warmupType !== "zero" && !this.warmupName.trim()) return new Notice("Укажите название включения.");
    if (this.algorithms.some(item => !item.name)) return new Notice("Выберите название для каждого алгоритма.");
    const warmup = this.warmupType === "zero"
      ? { type: "zero", name: "ZERO", sequence, repetitions: this.repetitions.trim() }
      : { type: this.warmupType, name: this.warmupName.trim(), sequence: [], repetitions: this.repetitions.trim() };
    const text = manualWorkoutText({ date: this.date, client, warmup, algorithms: this.algorithms });
    this.close();
    new WorkoutImportModal(this.app, this.plugin, text).open();
  }

  onClose() {
    this.contentEl.empty();
  }
}

class WorkoutImportModal extends Modal {
  constructor(app, plugin, initialText = "", options = {}) {
    super(app);
    this.plugin = plugin;
    this.inputText = initialText;
    this.options = options;
    this.workout = null;
    this.resolution = null;
    this.resultEl = null;
    this.createSetting = null;
    this.creating = false;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.addClass("yoga-import-modal");
    contentEl.createEl("h2", { text: this.options.handoff ? "Предпросмотр тренировки" : "Собрать тренировку Yoga" });
    contentEl.createEl("p", {
      text: this.options.handoff
        ? "Состав тренировки получен из Telegram. Схемы ниже ищутся и открываются только среди файлов этого хранилища."
        : "Вставьте целиком сообщение сформированной тренировки из Telegram. Обработка выполняется только внутри этого хранилища."
    });

    if (!this.options.handoff) {
      const checkSetting = new Setting(contentEl)
        .setDesc("После вставки текста нажмите кнопку — материалы будут найдены до создания заметки.")
        .addButton(button => button
          .setButtonText("Проверить материалы")
          .setCta()
          .onClick(() => this.preview()));
      checkSetting.settingEl.addClass("yoga-import-primary-action");

      const textArea = contentEl.createEl("textarea", {
        cls: "yoga-import-textarea",
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
    }

    this.resultEl = contentEl.createDiv({ cls: "yoga-import-results" });
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
      this.resultEl.createDiv({ cls: "yoga-status yoga-status-error", text: message });
      return;
    }

    this.resultEl.createEl("h3", { text: this.workout.title });
    const ownerName = this.workout.client || "Себе";
    this.resultEl.createDiv({
      cls: "yoga-status yoga-status-success",
      text: `${this.workout.client ? `Клиент: ${ownerName}` : "Себе"} · тренировка будет сохранена в папку «${ownerName}».`
    });
    const found = this.resolution.matches.size;
    const total = this.workout.requiredMaterials.length;
    this.resultEl.createDiv({
      cls: `yoga-status ${this.resolution.missing.length ? "yoga-status-warning" : "yoga-status-success"}`,
      text: total ? `Материалы: найдено ${found} из ${total}.` : "Для этой тренировки отдельные схемы не требуются."
    });

    if (this.options.handoff && total) this.renderLocalPreviews();

    if (this.resolution.missing.length) {
      const item = this.resolution.missing[0];
      const description = item.reason === "ambiguous"
        ? `В папке «${item.expectedFolder}» найдено несколько похожих файлов — выберите нужный.`
        : `Файл не найден в папке «${item.expectedFolder}».`;
      const wizardEl = this.resultEl.createDiv({ cls: "yoga-material-wizard" });
      wizardEl.createDiv({
        cls: "yoga-material-progress",
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

  renderLocalPreviews() {
    const gallery = this.resultEl.createDiv({ cls: "yoga-local-preview-gallery" });
    gallery.createEl("h4", { text: "Локальный предпросмотр" });
    this.workout.requiredMaterials.forEach(requirement => {
      const match = this.resolution.matches.get(requirement.id);
      const card = gallery.createDiv({ cls: "yoga-local-preview-card" });
      card.createEl("strong", { text: requirement.displayName });
      if (!match?.file) {
        card.createDiv({ cls: "yoga-local-preview-missing", text: "Файл не найден" });
        return;
      }
      const file = match.file;
      if (String(file.extension || "").toLocaleLowerCase("en") === "pdf") {
        card.createEl("a", { text: `Открыть PDF: ${file.name}`, href: this.app.vault.getResourcePath(file) });
      } else {
        card.createEl("img", {
          attr: { src: this.app.vault.getResourcePath(file), alt: requirement.displayName }
        });
      }
    });
  }

  pickMaterialFromDevice(item, button) {
    const input = this.contentEl.doc.createElement("input");
    input.type = "file";
    input.accept = "image/png,image/jpeg,image/webp,image/gif,application/pdf";
    input.className = "yoga-hidden-file-input";
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

class YogaWorkoutSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Yoga Workout Importer" });
    containerEl.createEl("p", {
      text: "Плагин работает локально. Он не подключается к Telegram и не отправляет содержимое хранилища наружу."
    });
    containerEl.createEl("p", { text: `Версия плагина: ${PLUGIN_VERSION}` });

    new Setting(containerEl)
      .setName("Папка с материалами")
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
          await Promise.all(["F1", "F2", "F3", "ZERO", "ON", "SURYA"].map(folder =>
            ensureFolder(this.app.vault, `${this.plugin.settings.libraryFolder}/${folder}`)
          ));
          await ensureFolder(this.app.vault, this.plugin.settings.workoutsFolder);
          await ensureFolder(this.app.vault, `${this.plugin.settings.workoutsFolder}/Себе`);
          new Notice("Папки конструктора готовы.");
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

export default class YogaWorkoutImporterPlugin extends Plugin {
  async onload() {
    await this.loadSettings();

    this.addRibbonIcon("clipboard-paste", "Собрать тренировку", () => this.openImporterFromClipboard());
    this.addRibbonIcon("pencil", "Записать тренировку", () => new ManualWorkoutModal(this.app, this).open());
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
    this.addCommand({
      id: "record-workout-manually",
      name: "Записать тренировку",
      callback: () => new ManualWorkoutModal(this.app, this).open()
    });
    this.registerObsidianProtocolHandler("yoga-workout-importer", params => {
      try {
        const text = handoffWorkoutText(params.workout);
        new WorkoutImportModal(this.app, this, text, { handoff: true }).open();
      } catch (error) {
        new Notice(`Не удалось открыть предпросмотр: ${error.message}`);
      }
    });
    this.addSettingTab(new YogaWorkoutSettingTab(this.app, this));
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
    const clientFolder = safeFolderName(workout.client);
    const ownerFolder = /^тренировка\s+yoga$/iu.test(clientFolder) ? "Себе" : (clientFolder || "Себе");
    const destinationFolder = normalizePath(`${outputFolder}/${ownerFolder}`);
    await ensureFolder(this.app.vault, destinationFolder);

    const prefix = workout.date ? `${workout.date} — ` : "";
    const baseName = safeFileName(`${prefix}${workout.title}`);
    let notePath = normalizePath(`${destinationFolder}/${baseName}.md`);
    let suffix = 2;
    while (this.app.vault.getAbstractFileByPath(notePath)) {
      notePath = normalizePath(`${destinationFolder}/${baseName} (${suffix}).md`);
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
