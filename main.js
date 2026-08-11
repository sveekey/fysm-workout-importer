var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.js
var main_exports = {};
__export(main_exports, {
  default: () => YogaWorkoutImporterPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");

// src/catalog.js
var YOGA_ALGORITHMS = {
  F1: [
    "\u0421\u0442\u0440\u0443\u043D\u0430",
    "\u0414\u0435\u0442\u0430\u043B\u0438",
    "\u0426\u0435\u043D\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435",
    "\u0421\u0443\u0441\u0442\u0430\u0432\u043D\u043E\u0439",
    "\u0427\u0435\u043B\u043B\u0435\u043D\u0434\u0436",
    "\u0417\u0430\u0432\u0438\u0445\u0440\u0435\u043D\u0438\u0435",
    "\u042D\u043A\u0437\u0435\u0440\u0441\u0438\u0441",
    "\u0425\u0435\u043B\u0437",
    "\u0425\u0435\u043B\u0444",
    "\u0410\u0437\u044B \u043F\u043B\u043E\u0442\u043D\u043E\u0441\u0442\u0438",
    "\u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0438\u0437\u0430\u0446\u0438\u044F",
    "\u0411\u0430\u043B\u0430\u043D\u0441 \u0438 \u0441\u0438\u043B\u0430",
    "\u0413\u0440\u0430\u043D\u044C",
    "\u0418\u043D\u0442\u0435\u0433\u0440\u0430\u043B\u044C\u043D\u044B\u0439",
    "\u0423\u043F\u043B\u043E\u0442\u043D\u0435\u043D\u0438\u0435",
    "\u041E\u0442\u043A\u0440\u044B\u0442\u0438\u0435",
    "\u0416\u0435\u043B\u0435\u0437\u043D\u043E",
    "\u041F\u0440\u0435\u0434\u043B\u043E\u0433",
    "\u041A\u043E\u0440\u043D\u0438",
    "\u0421\u0442\u044B\u043A\u043E\u0432\u043A\u0430",
    "\u0413\u0440\u0430\u0446\u0438\u044F",
    "\u0428\u0442\u0438\u043B\u044C",
    "\u0426\u0438\u043A\u043B\u0438\u0447\u043D\u043E\u0441\u0442\u044C",
    "\u0420\u0430\u0437\u0432\u043E\u0440\u043E\u0442",
    "\u041A\u043E\u043C\u043F\u0435\u043D\u0441\u0430\u0446\u0438\u044F",
    "\u041C\u0438\u0440\u043D\u044B\u0439 \u0432\u043E\u0438\u043D",
    "\u0421\u0430\u0445\u0430\u0440"
  ],
  F2: [
    "\u0420\u0435\u0432\u0438\u0437\u0438\u044F",
    "\u0423\u0441\u0442\u0440\u0435\u043C\u043B\u0435\u043D\u0438\u0435",
    "\u041F\u0440\u043E\u0440\u0430\u0431\u043E\u0442\u043A\u0430",
    "\u0410\u043A\u0442\u0438\u0432\u0430\u0446\u0438\u044F \u0446\u0435\u043D\u0442\u0440\u0430",
    "\u041F\u0440\u043E\u0431\u0443\u0436\u0434\u0435\u043D\u0438\u0435 \u0441\u0438\u043B\u044B",
    "\u0421\u043F\u043E\u043D\u0442\u0430\u043D\u043D\u043E\u0441\u0442\u044C",
    "\u041E\u0448\u0435\u043B\u043E\u043C\u043B\u044F\u044E\u0449\u0430\u044F \u0431\u0435\u0437\u043C\u044F\u0442\u0435\u0436\u043D\u043E\u0441\u0442\u044C",
    "\u0413\u0435\u043E\u043C\u0435\u0442\u0440\u0438\u044F \u043F\u043E\u0442\u043E\u043A\u0430",
    "\u041E\u0434\u043D\u0430\u0436\u0434\u044B",
    "\u0421\u0442\u0430\u043D",
    "\u041F\u043E\u0442",
    "\u041B\u0435\u0435\u0440",
    "\u041B\u0435\u0441\u0435\u043D\u043A\u0430",
    "\u0412\u044F\u0437\u044C",
    "\u0412\u044B\u0445\u043E\u0434",
    "\u0420\u0430\u0441\u043A\u0438\u043D\u0443\u0442\u044C\u0441\u044F",
    "\u0421\u0434\u0432\u0438\u0433",
    "\u0412\u0438\u0437\u0438\u0442",
    "\u041F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430",
    "\u0424\u043B\u044E\u0433\u0435\u0440",
    "\u041C\u044F\u0433\u043A\u043E\u0441\u0442\u044C",
    "\u0410\u0441\u0438\u043C\u043C\u0435\u0442\u0440\u0438\u044F",
    "\u041A\u043B\u0430\u0441\u0441\u0438\u043A\u0430",
    "\u041E\u0440\u043D\u0430\u043C\u0435\u043D\u0442",
    "\u0422\u0435\u0440\u043F\u0435\u043D\u0438\u0435",
    "\u0412\u0435\u0440\u0435\u043D\u0438\u0446\u0430",
    "\u041F\u0435\u0440\u0435\u043B\u0438\u0432 \u21161"
  ],
  F3: [
    "\u0424\u0443\u0441\u0442",
    "\u0418\u0441\u0442\u043E\u043C\u0430",
    "\u041A\u0430\u0439\u0440\u043E\u0441",
    "\u041F\u0440\u0435\u043B\u043E\u043C\u043B\u0435\u043D\u0438\u0435",
    "\u0421\u043E\u043C\u0430",
    "\u0422\u0430\u043F\u0430\u0441",
    "\u0418\u043A\u0438",
    "\u041F\u0440\u0435\u0441\u0441",
    "\u0421\u0442\u044F\u0436\u043A\u0430",
    "\u0421\u0442\u0440\u0435\u043C\u044C",
    "\u041A\u0440\u0435\u043F\u044C",
    "\u0417\u043E\u0432\u044C",
    "\u0412\u0438\u043F\u0430\u0440\u0438\u0442\u0430 1",
    "\u041A\u0448\u0435\u0442\u0440\u0430",
    "\u0424\u0435\u0440\u0440\u0438\u0442",
    "\u041A\u0430\u043D\u0438\u0441",
    "\u0413\u0443\u0442\u0442\u0430",
    "\u0424\u043B\u044E\u043A\u0441\u0443\u0441",
    "\u041A\u043E\u0440\u043D\u0438 2",
    "\u0410\u0434\u0438",
    "\u041F\u043B\u0430\u0441\u0442",
    "\u0418\u0437\u043B\u0443\u0447\u0438\u043D\u0430",
    "\u0421\u0438\u0437\u0430\u0440\u044C",
    "\u0428\u0442\u0438\u043B\u044C 2",
    "\u0421\u043E\u0447\u043B\u0435\u043D\u0435\u043D\u0438\u0435",
    "\u041C\u0435\u0437\u0437\u043E \u041B\u043E\u0442\u043E",
    "\u0421\u0443\u0442\u0440\u0430"
  ],
  "LITE": [
    "Lite 1",
    "Lite 2",
    "Lite 3",
    "Lite 4",
    "Lite 5",
    "Lite 6",
    "Lite 7",
    "Lite 8",
    "Lite 9",
    "Lite 10",
    "Lite 11",
    "Lite 12",
    "Lite 13",
    "Lite 14",
    "Lite 15"
  ]
};
function findAlgorithmSet(name = "") {
  const normalized = String(name).normalize("NFKC").toLocaleLowerCase("ru").replace(/ё/g, "\u0435").trim();
  for (const [set, names] of Object.entries(YOGA_ALGORITHMS)) {
    if (names.some((item) => item.normalize("NFKC").toLocaleLowerCase("ru").replace(/ё/g, "\u0435").trim() === normalized)) {
      return set;
    }
  }
  return "";
}

// src/parser.js
var FIELD_PREFIX_RE = /^\s*[•·*-]?\s*/u;
var WorkoutParseError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "WorkoutParseError";
  }
};
function decodeBasicHtmlEntities(value = "") {
  return String(value).replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&#39;/gi, "'");
}
function stripTelegramFormatting(value = "") {
  return decodeBasicHtmlEntities(String(value)).replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "").replace(/\*\*/g, "").replace(/\s*\(https?:\/\/[^)]+\)/gi, "").replace(/\r\n?/g, "\n");
}
function fieldValue(lines, label) {
  const labelRe = new RegExp(`^${label}\\s*:\\s*(.*)$`, "iu");
  for (const rawLine of lines) {
    const line = rawLine.replace(FIELD_PREFIX_RE, "").trim();
    const match = line.match(labelRe);
    if (match) return match[1].trim();
  }
  return "";
}
function cleanInline(value = "") {
  return String(value).replace(/\s+/g, " ").replace(/^\s*[🥌☀️🗿]\s*/u, "").trim();
}
function cleanClientName(value = "") {
  const name = cleanInline(value).replace(/^[«“"']+|[»”"']+$/gu, "").replace(/[.,;]+$/gu, "").trim();
  if (!name || name.length > 100 || /^(?:себе|self|тренировка\s+yoga)$/iu.test(name)) return "";
  return name;
}
function extractClientName(comment = "") {
  const value = cleanInline(comment);
  if (!value) return "";
  const patterns = [
    /(?:^|\|)\s*👤\s*(?:клиент(?:у|а)?\s*:\s*)?([^|]+?)\s*$/iu,
    /^(?:🔮\s*)?Оракул\s+для\s*:\s*([^|:]+?)\s*$/iu,
    /^(?:🍪\s*)?Пиифия\s+для\s+(.+?)\s*:/iu,
    /(?:^|[|;])\s*(?:Клиент|Клиенту|Для\s+клиента)\s*:\s*([^|;]+)/iu
  ];
  for (const pattern of patterns) {
    const match = value.match(pattern);
    const name = cleanClientName(match?.[1]);
    if (name) return name;
  }
  return "";
}
function normalizeMode(value = "") {
  return cleanInline(value).replace(/[xXхХ]/g, "\u0445");
}
function normalizeZone(value = "") {
  if (value === "\u{1F53C}" || value === "\u2B06\uFE0F") return "\u{1F53C}";
  if (value === "\u{1F53D}" || value === "\u2B07\uFE0F") return "\u{1F53D}";
  if (value === "\u23FA\uFE0F") return "\u23FA\uFE0F";
  return "";
}
function parseTitle(lines) {
  for (const rawLine of lines.slice(0, 12)) {
    const line = rawLine.trim();
    const match = line.match(/^[«“](.+?)[»”]$/u) || line.match(/[«“](.+?)[»”]/u);
    if (match && match[1] && !match[1].includes("\u2014")) return match[1].trim();
  }
  return "\u0422\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0430 Yoga";
}
function parseEstimatedMinutes(text) {
  const match = text.match(/(?:Расчетное|Расчётное|Уточнённое)\s+время[^\d]{0,30}~?(\d+)\s*мин/iu);
  return match ? Number.parseInt(match[1], 10) : null;
}
function parseWarmup(rawValue) {
  const value = cleanInline(rawValue);
  if (!value) throw new WorkoutParseError("\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 ON.");
  if (/\bZERO\b/iu.test(value)) {
    const sequencePart = value.match(/\(([^)]*)\)/u)?.[1] || "";
    const sequence = [...sequencePart.matchAll(/\d+/g)].map((match) => Number.parseInt(match[0], 10)).filter(Number.isFinite);
    const repetitions2 = cleanInline(value.match(/(?:^|\s)на\s+(.+)$/iu)?.[1] || "").replace(/\s*(?:кругов|круга|круг)\s*$/iu, "").trim();
    return { type: "zero", name: "ZERO", sequence, repetitions: repetitions2 };
  }
  if (/Сурья\s+Намаскар|Приветств\w*(?:\s+Солнцу)?/iu.test(value)) {
    const name2 = value.match(/Сурья\s+Намаскар\s*\d*/iu)?.[0]?.trim() || "\u0421\u0443\u0440\u044C\u044F \u041D\u0430\u043C\u0430\u0441\u043A\u0430\u0440 1";
    const repetitions2 = cleanInline(value.match(/(?:^|\s)на\s+(.+)$/iu)?.[1] || "").replace(/\s*(?:кругов|круга|круг)\s*$/iu, "").trim();
    return { type: "surya", name: name2, sequence: [], repetitions: repetitions2 };
  }
  const name = value.match(/\bON\s*\d+\b/iu)?.[0]?.replace(/ON\s*/iu, "ON ") || (value.match(/\bСтатика\b/iu) ? "\u0421\u0442\u0430\u0442\u0438\u043A\u0430" : value.split(/\s+на\s+/iu)[0].trim());
  const repetitions = cleanInline(value.match(/(?:^|\s)на\s+(.+)$/iu)?.[1] || "").replace(/\s*(?:кругов|круга|круг)\s*$/iu, "").trim();
  return { type: "static", name, sequence: [], repetitions };
}
function parseAlgorithms(lines) {
  const startIndex = lines.findIndex((rawLine) => {
    const line = rawLine.replace(FIELD_PREFIX_RE, "").trim();
    return /^Алгоритмы\s*:/iu.test(line);
  });
  if (startIndex < 0) throw new WorkoutParseError("\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u0431\u043B\u043E\u043A \xAB\u0410\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u044B\xBB.");
  const header = lines[startIndex].replace(FIELD_PREFIX_RE, "").trim();
  if (/Алгоритмы\s*:\s*(?:нет|—)\s*$/iu.test(header)) return [];
  const algorithms = [];
  for (const rawLine of lines.slice(startIndex + 1)) {
    const line = rawLine.trim();
    if (!line) {
      if (algorithms.length) break;
      continue;
    }
    if (/^(?:Что делаем|Комментарий|📌|🛠)/iu.test(line.replace(FIELD_PREFIX_RE, ""))) break;
    const match = line.match(/^\s*(\d+)\)\s*(.+?)\s+[—–-]\s+(.+?)\s*$/u);
    if (!match) continue;
    const left = match[2].trim();
    let set = "";
    if (left.includes("1\uFE0F\u20E3")) set = "F1";
    else if (left.includes("2\uFE0F\u20E3")) set = "F2";
    else if (left.includes("3\uFE0F\u20E3")) set = "F3";
    else if (left.includes("\u23FA\uFE0F")) set = "LITE";
    const zone = normalizeZone(left.match(/🔼|🔽|⏺️|⬆️|⬇️/u)?.[0]);
    const name = left.replace(/^(?:1️⃣|2️⃣|3️⃣|⏺️)\s*/u, "").replace(/\s*(?:🔼|🔽|⏺️|⬆️|⬇️)\s*$/u, "").trim();
    if (name) {
      const catalogSet = findAlgorithmSet(name);
      algorithms.push({
        index: Number.parseInt(match[1], 10),
        name,
        set: catalogSet || set,
        mode: normalizeMode(match[3]),
        ...zone ? { zone } : {}
      });
    }
  }
  return algorithms;
}
function normalizeMaterialName(value = "") {
  return String(value).normalize("NFKC").toLocaleLowerCase("ru").replace(/ё/g, "\u0435").replace(/[_–—-]+/g, " ").replace(/[^\p{L}\p{N}]+/gu, " ").replace(/\b0+(\d+)\b/g, "$1").replace(/\s+/g, " ").trim();
}
function getRequiredMaterials(workout) {
  const result = [];
  const seen = /* @__PURE__ */ new Set();
  const add = (kind, displayName, set = "") => {
    const normalized = normalizeMaterialName(displayName);
    if (!normalized) return;
    const id = `${kind}:${normalized}`;
    if (seen.has(id)) return;
    seen.add(id);
    result.push({ id, kind, displayName, set });
  };
  if (workout.warmup.type === "zero") {
    workout.warmup.sequence.forEach((number) => add("warmup", `ZERO ${number}`));
  } else if (workout.warmup.name && workout.warmup.name !== "\u0421\u0442\u0430\u0442\u0438\u043A\u0430") {
    add("warmup", workout.warmup.name);
  }
  workout.algorithms.forEach((algorithm) => {
    if (["F1", "F2", "F3"].includes(algorithm.set)) {
      add("algorithm", algorithm.name, algorithm.set);
    }
  });
  return result;
}
function parseWorkoutText(rawText) {
  const text = stripTelegramFormatting(rawText).trim();
  if (!text) throw new WorkoutParseError("\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0438 \u0438\u0437 Telegram.");
  const lines = text.split("\n").map((line) => line.trimEnd());
  const date = fieldValue(lines, "\u0414\u0430\u0442\u0430");
  const metronome = fieldValue(lines, "\u041C\u0435\u0442\u0440\u043E\u043D\u043E\u043C") || "20";
  const onValue = fieldValue(lines, "ON");
  if (!onValue) throw new WorkoutParseError("\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043F\u043E\u043B\u0435 \xABON\xBB. \u0421\u043A\u043E\u043F\u0438\u0440\u0443\u0439\u0442\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0438 \u0446\u0435\u043B\u0438\u043A\u043E\u043C.");
  const comment = cleanInline(fieldValue(lines, "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439"));
  const workout = {
    title: parseTitle(lines),
    date: date.match(/\d{4}-\d{2}-\d{2}/u)?.[0] || date,
    level: cleanInline(fieldValue(lines, "\u0423\u0440\u043E\u0432\u0435\u043D\u044C")),
    metronome: cleanInline(metronome),
    estimatedMinutes: parseEstimatedMinutes(text),
    warmup: parseWarmup(onValue),
    algorithms: parseAlgorithms(lines),
    comment,
    client: extractClientName(comment)
  };
  workout.requiredMaterials = getRequiredMaterials(workout);
  return workout;
}

// src/markdown.js
function yamlString(value = "") {
  return JSON.stringify(String(value));
}
function materialBlock(requirement, match, makeEmbed) {
  if (match?.file) return makeEmbed(match.file);
  return `> [!warning] \u0421\u0445\u0435\u043C\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430
> \u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B \xAB${requirement.displayName}\xBB \u0447\u0435\u0440\u0435\u0437 \u0438\u043C\u043F\u043E\u0440\u0442\u0451\u0440 Yoga.`;
}
function findRequirement(workout, kind, displayName) {
  return workout.requiredMaterials.find((item) => item.kind === kind && item.displayName === displayName);
}
function setEmoji(set = "") {
  return {
    F1: "1\uFE0F\u20E3",
    F2: "2\uFE0F\u20E3",
    F3: "3\uFE0F\u20E3",
    LITE: "\u23FA\uFE0F"
  }[set] || "";
}
function warmupCardLine(warmup) {
  const repetitions = warmup.repetitions ? ` \u043D\u0430 **${warmup.repetitions}**` : "";
  if (warmup.type === "zero") {
    const sequence = warmup.sequence.length ? ` ( ${warmup.sequence.join(", ")} )` : "";
    return `\u{1F94C} **ZERO**${sequence}${repetitions}`;
  }
  const icon = warmup.type === "surya" ? "\u2600\uFE0F" : "\u{1F5FF}";
  const rounds = warmup.type === "static" || warmup.type === "surya" ? warmup.repetitions ? " \u043A\u0440\u0443\u0433\u043E\u0432" : "" : "";
  return `${icon} **${warmup.name}**${repetitions}${rounds}`;
}
function buildWorkoutMarkdown(workout, resolution, makeEmbed) {
  const lines = [
    "---",
    `title: ${yamlString(workout.title)}`,
    workout.date ? `date: ${yamlString(workout.date)}` : "",
    workout.client ? `client: ${yamlString(workout.client)}` : "",
    "source: Yoga",
    "yoga_imported: true",
    "tags:",
    "  - yoga/training",
    "---",
    "",
    `**\xAB${workout.title}\xBB**`,
    ""
  ].filter((line) => line !== "");
  const meta = [];
  if (workout.date) meta.push(`\u2022 **\u0414\u0430\u0442\u0430**: ${workout.date}`);
  if (workout.client) meta.push(`\u2022 **\u041A\u043B\u0438\u0435\u043D\u0442**: ${workout.client}`);
  if (workout.level) meta.push(`\u2022 **\u0423\u0440\u043E\u0432\u0435\u043D\u044C**: ${workout.level}`);
  if (workout.estimatedMinutes) meta.push(`\u2022 **\u0420\u0430\u0441\u0447\u0435\u0442\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F:** **\u23F1** ~${workout.estimatedMinutes} \u043C\u0438\u043D`);
  meta.push(`\u2022 **\u041C\u0435\u0442\u0440\u043E\u043D\u043E\u043C**: ${workout.metronome}`);
  meta.push(`\u2022 **ON**: ${warmupCardLine(workout.warmup)}`);
  if (workout.algorithms.length) {
    meta.push("\u2022 **\u0410\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u044B**:");
    workout.algorithms.forEach((algorithm, index) => {
      const prefix = [setEmoji(algorithm.set), `**${algorithm.name}**`, algorithm.zone].filter(Boolean).join(" ");
      meta.push(`${index + 1}) ${prefix}${algorithm.mode ? ` \u2014 **${algorithm.mode}**` : ""}`);
    });
  } else {
    meta.push("\u2022 **\u0410\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u044B**: \u043D\u0435\u0442");
  }
  lines.push(...meta, "", "## \u0412\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435", "");
  if (workout.warmup.type === "zero") {
    const sequence = workout.warmup.sequence.join(", ");
    const repetitions = workout.warmup.repetitions ? ` \u2014 ${workout.warmup.repetitions}` : "";
    lines.push(`**ZERO**${sequence ? ` ${sequence}` : ""}${repetitions}`, "");
    if (!workout.warmup.sequence.length) {
      lines.push("> [!warning] \u0412 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0438 \u043D\u0435 \u0431\u044B\u043B\u043E \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u044B\u0445 \u043D\u043E\u043C\u0435\u0440\u043E\u0432 ZERO.", "");
    }
    for (const number of workout.warmup.sequence) {
      const displayName = `ZERO ${number}`;
      const requirement = findRequirement(workout, "warmup", displayName);
      const match = requirement ? resolution.matches.get(requirement.id) : null;
      lines.push(materialBlock(requirement || { displayName }, match, makeEmbed), "");
    }
  } else {
    lines.push(`**${workout.warmup.name}**${workout.warmup.repetitions ? ` \u2014 ${workout.warmup.repetitions}` : ""}`, "");
    const requirement = findRequirement(workout, "warmup", workout.warmup.name);
    if (requirement) {
      lines.push(materialBlock(requirement, resolution.matches.get(requirement.id), makeEmbed), "");
    }
  }
  lines.push("## \u0410\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u044B", "");
  if (!workout.algorithms.length) {
    lines.push("\u0410\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u043E\u0432 \u043D\u0435\u0442.", "");
  }
  workout.algorithms.forEach((algorithm, index) => {
    const mode = algorithm.mode ? ` \xB7 ${algorithm.mode}` : "";
    lines.push(`### ${index + 1}. ${algorithm.name}${mode}`, "");
    const requirement = findRequirement(workout, "algorithm", algorithm.name);
    if (requirement) {
      lines.push(materialBlock(requirement, resolution.matches.get(requirement.id), makeEmbed), "");
    }
  });
  if (workout.comment) lines.push("## \u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439", "", workout.comment, "");
  lines.push("---", "*\u0421\u043E\u0437\u0434\u0430\u043D\u043E \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E \u0438\u0437 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0433\u043E \u0442\u0435\u043A\u0441\u0442\u0430. \u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B \u043D\u0435 \u043F\u0435\u0440\u0435\u0434\u0430\u0432\u0430\u043B\u0438\u0441\u044C \u0432 Telegram \u0438\u043B\u0438 \u043D\u0430 \u0432\u043D\u0435\u0448\u043D\u0438\u0439 \u0441\u0435\u0440\u0432\u0435\u0440.*", "");
  return `${lines.join("\n").replace(/\n{3,}/g, "\n\n")}
`;
}

// src/library.js
var SUPPORTED_EXTENSIONS = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "webp", "gif", "svg", "pdf"]);
function isSupportedMaterialFile(file) {
  return !!file && SUPPORTED_EXTENSIONS.has(String(file.extension || "").toLocaleLowerCase("en"));
}
function isInsideFolder(filePath, folderPath) {
  const folder = String(folderPath || "").replace(/^\/+|\/+$/g, "");
  if (!folder) return true;
  return filePath === folder || filePath.startsWith(`${folder}/`);
}
function getRequirementFolder(libraryFolder, requirement) {
  const root = String(libraryFolder || "").replace(/^\/+|\/+$/g, "");
  let child = "";
  if (requirement.kind === "algorithm" && ["F1", "F2", "F3"].includes(requirement.set)) {
    child = requirement.set;
  } else if (requirement.kind === "warmup" && normalizeMaterialName(requirement.displayName).startsWith("zero ")) {
    child = "ZERO";
  } else if (requirement.kind === "warmup" && normalizeMaterialName(requirement.displayName).startsWith("\u0441\u0443\u0440\u044C\u044F \u043D\u0430\u043C\u0430\u0441\u043A\u0430\u0440 ")) {
    child = "SURYA";
  } else if (requirement.kind === "warmup") {
    child = "ON";
  }
  return [root, child].filter(Boolean).join("/");
}
function scoreCandidate(requirement, file) {
  const wanted = normalizeMaterialName(requirement.displayName);
  const basename = normalizeMaterialName(file.basename);
  const pathWithoutExtension = normalizeMaterialName(file.path.replace(/\.[^.]+$/u, ""));
  if (!wanted || !basename) return 0;
  if (basename === wanted) return 100;
  if (requirement.kind === "warmup" && wanted.startsWith("zero ")) {
    const number = wanted.match(/\d+/u)?.[0] || "";
    if (number && basename === number) return 90;
    if (number && basename === `zero ${number}`) return 100;
  }
  const withoutSetPrefix = basename.replace(/^f[123]\s+/iu, "");
  if (withoutSetPrefix === wanted) return 92;
  if (wanted.length >= 5 && (basename.startsWith(`${wanted} `) || basename.endsWith(` ${wanted}`))) return 75;
  if (wanted.length >= 5 && pathWithoutExtension.endsWith(` ${wanted}`)) return 70;
  return 0;
}
function listMaterialFiles(app, libraryFolder = "") {
  return app.vault.getFiles().filter(isSupportedMaterialFile).filter((file) => isInsideFolder(file.path, libraryFolder));
}
function resolveWorkoutMaterials(app, workout, settings) {
  const files = listMaterialFiles(app, settings.libraryFolder);
  const byPath = new Map(files.map((file) => [file.path, file]));
  const matches = /* @__PURE__ */ new Map();
  const missing = [];
  for (const requirement of workout.requiredMaterials) {
    const expectedFolder = getRequirementFolder(settings.libraryFolder, requirement);
    const eligibleFiles = files.filter((file) => isInsideFolder(file.path, expectedFolder));
    const mappedPath = settings.materialMap?.[requirement.id];
    const mappedFile = mappedPath ? app.vault.getAbstractFileByPath(mappedPath) : null;
    if (mappedFile && isSupportedMaterialFile(mappedFile) && isInsideFolder(mappedFile.path, expectedFolder)) {
      matches.set(requirement.id, { requirement, file: mappedFile, source: "manual" });
      continue;
    }
    const scored = eligibleFiles.map((file) => ({ file, score: scoreCandidate(requirement, file) })).filter((candidate) => candidate.score > 0).sort((left, right) => right.score - left.score || left.file.path.localeCompare(right.file.path, "ru"));
    const bestScore = scored[0]?.score || 0;
    const best = scored.filter((candidate) => candidate.score === bestScore);
    if (bestScore > 0 && best.length === 1) {
      matches.set(requirement.id, { requirement, file: best[0].file, source: "automatic" });
    } else {
      missing.push({
        requirement,
        expectedFolder,
        candidates: best.slice(0, 5).map((candidate) => candidate.file),
        reason: best.length > 1 ? "ambiguous" : "missing"
      });
    }
  }
  return { matches, missing, filesByPath: byPath };
}

// src/main.js
var DEFAULT_SETTINGS = {
  libraryFolder: "\u041A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440 \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043E\u043A/\u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B",
  workoutsFolder: "\u041A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440 \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043E\u043A/\u0422\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0438",
  materialMap: {}
};
var PLUGIN_VERSION = "0.10.0";
function cleanFolderPath(value, fallback) {
  const normalized = (0, import_obsidian.normalizePath)(String(value || "").trim().replace(/^\/+|\/+$/g, ""));
  return normalized || fallback;
}
function safeFileName(value = "") {
  const cleaned = String(value).replace(/[\\/:*?"<>|#[\]^]/g, " ").replace(/\s+/g, " ").trim();
  return cleaned.slice(0, 100) || "\u0422\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0430 Yoga";
}
function safeFolderName(value = "") {
  const cleaned = safeFileName(value).replace(/^\.+|\.+$/g, "").trim();
  return cleaned && cleaned !== "." && cleaned !== ".." ? cleaned : "";
}
function getImportedFileExtension(file) {
  const fromName = String(file?.name || "").match(/\.([a-z0-9]+)$/iu)?.[1]?.toLocaleLowerCase("en") || "";
  const supported = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "webp", "gif", "pdf"]);
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
  const normalized = (0, import_obsidian.normalizePath)(folderPath);
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
  const now = /* @__PURE__ */ new Date();
  const offset = now.getTimezoneOffset() * 6e4;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}
function listSavedClientNames(app, workoutsFolder) {
  const folder = app.vault.getAbstractFileByPath(workoutsFolder);
  return (folder?.children || []).filter((item) => Array.isArray(item.children)).map((item) => item.name).filter((name) => name && name !== "\u0421\u0435\u0431\u0435").sort((left, right) => left.localeCompare(right, "ru"));
}
function manualWorkoutTitle(warmup, algorithms) {
  const warmupPart = warmup.type === "zero" ? `ZERO ${warmup.sequence.join(", ")}${warmup.repetitions ? ` \u2014 ${warmup.repetitions}` : ""}` : `${warmup.name}${warmup.repetitions ? ` \u2014 ${warmup.repetitions}` : ""}`;
  const algorithmParts = algorithms.map((item) => `${item.name}${item.mode ? ` \u2014 ${item.mode}` : ""}`);
  return [warmupPart, ...algorithmParts].filter(Boolean).join(", ") || "\u0422\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0430 Yoga";
}
function manualWorkoutText({ date, client, warmup, algorithms, title: titleOverride = "", metronome = "20", level = "", comment = "" }) {
  const title = String(titleOverride).trim() || manualWorkoutTitle(warmup, algorithms);
  const warmupText = warmup.type === "zero" ? `\u{1F94C} **ZERO** ( ${warmup.sequence.join(", ")} )${warmup.repetitions ? ` \u043D\u0430 **${warmup.repetitions}**` : ""}` : `${warmup.type === "surya" ? "\u2600\uFE0F" : "\u{1F5FF}"} **${warmup.name}**${warmup.repetitions ? ` \u043D\u0430 **${warmup.repetitions}**` : ""}`;
  const setEmoji2 = { F1: "1\uFE0F\u20E3", F2: "2\uFE0F\u20E3", F3: "3\uFE0F\u20E3", LITE: "\u23FA\uFE0F" };
  const lines = [
    `**\xAB${title}\xBB**`,
    `\u2022 **\u0414\u0430\u0442\u0430**: ${date}`,
    level ? `\u2022 **\u0423\u0440\u043E\u0432\u0435\u043D\u044C**: ${level}` : "",
    `\u2022 **\u041C\u0435\u0442\u0440\u043E\u043D\u043E\u043C**: ${metronome || "20"}`,
    `\u2022 **ON**: ${warmupText}`,
    "\u2022 **\u0410\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u044B**:"
  ];
  if (!lines[2]) lines.splice(2, 1);
  if (!algorithms.length) lines.push("\u043D\u0435\u0442");
  algorithms.forEach((item, index) => {
    lines.push(`${index + 1}) ${setEmoji2[item.set] || ""} **${item.name}**${item.zone ? ` ${item.zone}` : ""}${item.mode ? ` \u2014 **${item.mode}**` : ""}`.trim());
  });
  if (client) lines.push(`\u2022 **\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439**: \u041A\u043B\u0438\u0435\u043D\u0442: ${client}`);
  else if (comment) lines.push(`\u2022 **\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439**: ${comment}`);
  return lines.join("\n");
}
function decodeBase64UrlJson(value = "") {
  const normalized = String(value || "").replace(/-/g, "+").replace(/_/g, "/");
  if (!normalized || !/^[A-Za-z0-9+/]*={0,2}$/u.test(normalized)) throw new Error("\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0441\u0441\u044B\u043B\u043A\u0438.");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}
function handoffWorkoutText(encodedPayload = "") {
  const payload = decodeBase64UrlJson(encodedPayload);
  if (!payload || payload.v !== 1 || !payload.warmup || !Array.isArray(payload.algorithms)) {
    throw new Error("\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0443 \u0443\u0441\u0442\u0430\u0440\u0435\u043B\u0430 \u0438\u043B\u0438 \u043F\u043E\u0432\u0440\u0435\u0436\u0434\u0435\u043D\u0430.");
  }
  const warmupType = ["zero", "static", "surya"].includes(payload.warmup.type) ? payload.warmup.type : "";
  const warmup = {
    type: warmupType,
    name: String(payload.warmup.name || (warmupType === "zero" ? "ZERO" : "")).trim(),
    sequence: Array.isArray(payload.warmup.sequence) ? payload.warmup.sequence.map(Number).filter((number) => Number.isInteger(number) && number >= 0 && number <= 999) : [],
    repetitions: String(payload.warmup.repetitions || "").trim().slice(0, 30)
  };
  if (!warmup.type || !warmup.name || warmup.type === "zero" && !warmup.sequence.length) {
    throw new Error("\u0412 \u0441\u0441\u044B\u043B\u043A\u0435 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E\u0435 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435.");
  }
  const algorithms = payload.algorithms.slice(0, 4).map((item) => ({
    set: ["F1", "F2", "F3", "LITE"].includes(item?.set) ? item.set : "",
    name: String(item?.name || "").trim().slice(0, 100),
    zone: ["\u{1F53C}", "\u{1F53D}", "\u23FA\uFE0F"].includes(item?.zone) ? item.zone : "",
    mode: String(item?.mode || "").trim().slice(0, 40)
  })).filter((item) => item.name && item.set);
  if (algorithms.length !== payload.algorithms.length) throw new Error("\u0412 \u0441\u0441\u044B\u043B\u043A\u0435 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u043E\u0434\u0438\u043D \u0438\u0437 \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u043E\u0432.");
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
var MaterialFileSuggestModal = class extends import_obsidian.FuzzySuggestModal {
  constructor(app, files, onChoose) {
    super(app);
    this.files = files;
    this.onChoose = onChoose;
    this.setPlaceholder("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u0438\u043B\u0438 PDF\u2026");
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
};
var AlgorithmNameSuggestModal = class extends import_obsidian.FuzzySuggestModal {
  constructor(app, names, onChoose) {
    super(app);
    this.names = names;
    this.onChoose = onChoose;
    this.setPlaceholder("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u2026");
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
};
var ManualWorkoutModal = class extends import_obsidian.Modal {
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
    contentEl.createEl("h2", { text: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0443" });
    contentEl.createEl("p", { text: "\u0421\u043E\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0443 \u043F\u043E \u0448\u0430\u0433\u0430\u043C. \u0412\u0441\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043E\u0441\u0442\u0430\u043D\u0443\u0442\u0441\u044F \u0432 \u044D\u0442\u043E\u043C \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0435." });
    const clients = listSavedClientNames(this.app, this.plugin.settings.workoutsFolder);
    new import_obsidian.Setting(contentEl).setName("\u0414\u043B\u044F \u043A\u043E\u0433\u043E").setDesc("\xAB\u0421\u0435\u0431\u0435\xBB \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u0442 \u0437\u0430\u043C\u0435\u0442\u043A\u0443 \u0432 \u043E\u0434\u043D\u043E\u0438\u043C\u0451\u043D\u043D\u0443\u044E \u043F\u0430\u043F\u043A\u0443. \u041A\u043B\u0438\u0435\u043D\u0442\u044B \u0431\u0435\u0440\u0443\u0442\u0441\u044F \u0438\u0437 \u0443\u0436\u0435 \u0441\u043E\u0437\u0434\u0430\u043D\u043D\u044B\u0445 \u043F\u0430\u043F\u043E\u043A \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043E\u043A.").addDropdown((dropdown) => {
      dropdown.addOption("self", "\u0421\u0435\u0431\u0435");
      clients.forEach((name) => dropdown.addOption(`client:${name}`, name));
      dropdown.addOption("new", "\u041D\u043E\u0432\u044B\u0439 \u043A\u043B\u0438\u0435\u043D\u0442\u2026");
      dropdown.setValue(this.owner).onChange((value) => {
        this.owner = value;
        this.render();
      });
    });
    if (this.owner === "new") {
      new import_obsidian.Setting(contentEl).setName("\u0418\u043C\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u0430").addText((text) => text.setPlaceholder("\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \u0410\u043D\u043D\u0430").setValue(this.newClient).onChange((value) => {
        this.newClient = value;
      }));
    }
    new import_obsidian.Setting(contentEl).setName("\u0414\u0430\u0442\u0430").addText((text) => text.setPlaceholder("\u0413\u0413\u0413\u0413-\u041C\u041C-\u0414\u0414").setValue(this.date).onChange((value) => {
      this.date = value.trim();
    }));
    new import_obsidian.Setting(contentEl).setName("\u0412\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435").addDropdown((dropdown) => dropdown.addOption("zero", "ZERO").addOption("static", "ON / \u0441\u0442\u0430\u0442\u0438\u043A\u0430").addOption("surya", "\u0421\u0443\u0440\u044C\u044F \u041D\u0430\u043C\u0430\u0441\u043A\u0430\u0440").setValue(this.warmupType).onChange((value) => {
      this.warmupType = value;
      if (value === "surya" && this.warmupName === "ON 10") this.warmupName = "\u0421\u0443\u0440\u044C\u044F \u041D\u0430\u043C\u0430\u0441\u043A\u0430\u0440 1";
      this.render();
    }));
    if (this.warmupType === "zero") {
      new import_obsidian.Setting(contentEl).setName("\u041D\u043E\u043C\u0435\u0440\u0430 ZERO").setDesc("\u0427\u0435\u0440\u0435\u0437 \u0437\u0430\u043F\u044F\u0442\u0443\u044E, \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: 9, 3, 1.").addText((text) => text.setPlaceholder("9, 3, 1").setValue(this.zeroNumbers).onChange((value) => {
        this.zeroNumbers = value;
      }));
    } else {
      new import_obsidian.Setting(contentEl).setName(this.warmupType === "surya" ? "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0421\u0443\u0440\u044C\u0438" : "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 ON").addText((text) => text.setValue(this.warmupName).onChange((value) => {
        this.warmupName = value;
      }));
    }
    new import_obsidian.Setting(contentEl).setName("\u0420\u0435\u0436\u0438\u043C \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F").setDesc("\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: 4\u04458 \u0438\u043B\u0438 8 \u043A\u0440\u0443\u0433\u043E\u0432.").addText((text) => text.setPlaceholder("4\u04458").setValue(this.repetitions).onChange((value) => {
      this.repetitions = value;
    }));
    contentEl.createEl("h3", { text: "\u0410\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u044B" });
    this.algorithms.forEach((algorithm, index) => this.renderAlgorithm(contentEl, algorithm, index));
    new import_obsidian.Setting(contentEl).addButton((button) => button.setButtonText("\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C").onClick(() => {
      this.algorithms.push({ set: "F1", name: "", zone: "", mode: "" });
      this.render();
    }));
    new import_obsidian.Setting(contentEl).setDesc("\u041F\u043E\u0441\u043B\u0435 \u044D\u0442\u043E\u0433\u043E \u043F\u043B\u0430\u0433\u0438\u043D \u043D\u0430\u0439\u0434\u0451\u0442 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0445\u0435\u043C\u044B \u0438 \u043F\u043E \u043E\u0434\u043D\u043E\u0439 \u043F\u043E\u043F\u0440\u043E\u0441\u0438\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435.").addButton((button) => button.setButtonText("\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B").setCta().onClick(() => this.openMaterialCheck()));
  }
  renderAlgorithm(container, algorithm, index) {
    const setting = new import_obsidian.Setting(container).setName(`${index + 1}. ${algorithm.name || "\u0410\u043B\u0433\u043E\u0440\u0438\u0442\u043C"}`);
    setting.addDropdown((dropdown) => dropdown.addOption("F1", "F1").addOption("F2", "F2").addOption("F3", "F3").addOption("LITE", "LITE").setValue(algorithm.set).onChange((value) => {
      algorithm.set = value;
      algorithm.name = "";
      this.render();
    }));
    setting.addButton((button) => button.setButtonText(algorithm.name || "\u0412\u044B\u0431\u0440\u0430\u0442\u044C").onClick(() => new AlgorithmNameSuggestModal(this.app, YOGA_ALGORITHMS[algorithm.set] || [], (name) => {
      algorithm.name = name;
      this.render();
    }).open()));
    setting.addExtraButton((button) => button.setIcon("trash").setTooltip("\u0423\u0431\u0440\u0430\u0442\u044C \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C").onClick(() => {
      this.algorithms.splice(index, 1);
      this.render();
    }));
    new import_obsidian.Setting(container).setDesc("\u0417\u043E\u043D\u0430 \u0438 \u0440\u0435\u0436\u0438\u043C").addDropdown((dropdown) => dropdown.addOption("", "\u0411\u0435\u0437 \u0437\u043E\u043D\u044B").addOption("\u{1F53C}", "\u{1F53C}").addOption("\u{1F53D}", "\u{1F53D}").addOption("\u23FA\uFE0F", "\u23FA\uFE0F").setValue(algorithm.zone).onChange((value) => {
      algorithm.zone = value;
    })).addText((text) => text.setPlaceholder("\u0420\u0435\u0436\u0438\u043C: 1\u04458").setValue(algorithm.mode).onChange((value) => {
      algorithm.mode = value;
    }));
  }
  openMaterialCheck() {
    const client = this.owner === "new" ? safeFolderName(this.newClient) : this.owner.startsWith("client:") ? this.owner.slice("client:".length) : "";
    const sequence = [...this.zeroNumbers.matchAll(/\d+/g)].map((match) => Number.parseInt(match[0], 10));
    if (!/^\d{4}-\d{2}-\d{2}$/u.test(this.date)) return new import_obsidian.Notice("\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0434\u0430\u0442\u0443 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 \u0413\u0413\u0413\u0413-\u041C\u041C-\u0414\u0414.");
    if (this.warmupType === "zero" && !sequence.length) return new import_obsidian.Notice("\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u0438\u043D \u043D\u043E\u043C\u0435\u0440 ZERO.");
    if (this.warmupType !== "zero" && !this.warmupName.trim()) return new import_obsidian.Notice("\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F.");
    if (this.algorithms.some((item) => !item.name)) return new import_obsidian.Notice("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0434\u043B\u044F \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u0430.");
    const warmup = this.warmupType === "zero" ? { type: "zero", name: "ZERO", sequence, repetitions: this.repetitions.trim() } : { type: this.warmupType, name: this.warmupName.trim(), sequence: [], repetitions: this.repetitions.trim() };
    const text = manualWorkoutText({ date: this.date, client, warmup, algorithms: this.algorithms });
    this.close();
    new WorkoutImportModal(this.app, this.plugin, text).open();
  }
  onClose() {
    this.contentEl.empty();
  }
};
var WorkoutImportModal = class extends import_obsidian.Modal {
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
    if (!this.options.handoff) {
      contentEl.createEl("h2", { text: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0443 Yoga" });
      contentEl.createEl("p", {
        text: "\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0446\u0435\u043B\u0438\u043A\u043E\u043C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0441\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0439 \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0438 \u0438\u0437 Telegram. \u041E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u0435\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u043D\u0443\u0442\u0440\u0438 \u044D\u0442\u043E\u0433\u043E \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0430."
      });
    }
    if (!this.options.handoff) {
      const checkSetting = new import_obsidian.Setting(contentEl).setDesc("\u041F\u043E\u0441\u043B\u0435 \u0432\u0441\u0442\u0430\u0432\u043A\u0438 \u0442\u0435\u043A\u0441\u0442\u0430 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \u2014 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B \u0431\u0443\u0434\u0443\u0442 \u043D\u0430\u0439\u0434\u0435\u043D\u044B \u0434\u043E \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0437\u0430\u043C\u0435\u0442\u043A\u0438.").addButton((button) => button.setButtonText("\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B").setCta().onClick(() => this.preview()));
      checkSetting.settingEl.addClass("yoga-import-primary-action");
      const textArea = contentEl.createEl("textarea", {
        cls: "yoga-import-textarea",
        attr: { placeholder: "\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0438\u2026" }
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
      const message = error instanceof WorkoutParseError ? error.message : `\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0440\u0430\u0437\u043E\u0431\u0440\u0430\u0442\u044C \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0443: ${error.message}`;
      this.resultEl.createDiv({ cls: "yoga-status yoga-status-error", text: message });
      return;
    }
    this.resultEl.createEl(this.options.handoff ? "h2" : "h3", { text: this.workout.title });
    const total = this.workout.requiredMaterials.length;
    if (this.options.handoff && total) this.renderLocalPreviews();
    const ownerName = this.workout.client || "\u0421\u0435\u0431\u0435";
    this.resultEl.createDiv({
      cls: "yoga-status yoga-status-success",
      text: `${this.workout.client ? `\u041A\u043B\u0438\u0435\u043D\u0442: ${ownerName}` : "\u0421\u0435\u0431\u0435"} \xB7 \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0430 \u0431\u0443\u0434\u0435\u0442 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430 \u0432 \u043F\u0430\u043F\u043A\u0443 \xAB${ownerName}\xBB.`
    });
    const found = this.resolution.matches.size;
    this.resultEl.createDiv({
      cls: `yoga-status ${this.resolution.missing.length ? "yoga-status-warning" : "yoga-status-success"}`,
      text: total ? `\u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B: \u043D\u0430\u0439\u0434\u0435\u043D\u043E ${found} \u0438\u0437 ${total}.` : "\u0414\u043B\u044F \u044D\u0442\u043E\u0439 \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0438 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u0435 \u0441\u0445\u0435\u043C\u044B \u043D\u0435 \u0442\u0440\u0435\u0431\u0443\u044E\u0442\u0441\u044F."
    });
    if (this.options.handoff) {
      this.resultEl.createDiv({
        cls: "yoga-local-preview-note",
        text: "\u0421\u043E\u0441\u0442\u0430\u0432 \u043F\u043E\u043B\u0443\u0447\u0435\u043D \u0438\u0437 Telegram. \u0421\u0445\u0435\u043C\u044B \u0432\u044B\u0448\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u0440\u0435\u0434\u0438 \u0444\u0430\u0439\u043B\u043E\u0432 \u044D\u0442\u043E\u0433\u043E \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0430."
      });
    }
    if (this.resolution.missing.length) {
      const item = this.resolution.missing[0];
      const description = item.reason === "ambiguous" ? `\u0412 \u043F\u0430\u043F\u043A\u0435 \xAB${item.expectedFolder}\xBB \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043F\u043E\u0445\u043E\u0436\u0438\u0445 \u0444\u0430\u0439\u043B\u043E\u0432 \u2014 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u0443\u0436\u043D\u044B\u0439.` : `\u0424\u0430\u0439\u043B \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u0432 \u043F\u0430\u043F\u043A\u0435 \xAB${item.expectedFolder}\xBB.`;
      const wizardEl = this.resultEl.createDiv({ cls: "yoga-material-wizard" });
      wizardEl.createDiv({
        cls: "yoga-material-progress",
        text: `\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B \xB7 \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C ${this.resolution.missing.length}`
      });
      new import_obsidian.Setting(wizardEl).setName(`\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \xAB${item.requirement.displayName}\xBB`).setDesc(`${description} \u041F\u043E\u0441\u043B\u0435 \u0432\u044B\u0431\u043E\u0440\u0430 \u043F\u043B\u0430\u0433\u0438\u043D \u0441\u0430\u043C \u043D\u0430\u0437\u043E\u0432\u0451\u0442 \u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442 \u043A\u043E\u043F\u0438\u044E \u0444\u0430\u0439\u043B\u0430.`).addButton((button) => button.setButtonText("\u0424\u043E\u0442\u043E / \u0424\u0430\u0439\u043B\u044B").setCta().onClick(() => this.pickMaterialFromDevice(item, button))).addButton((button) => button.setButtonText("\u0423\u0436\u0435 \u0432 vault").onClick(() => {
        const files = listMaterialFiles(this.app, item.expectedFolder);
        if (!files.length) {
          new import_obsidian.Notice(`\u0412 \u043F\u0430\u043F\u043A\u0435 \xAB${item.expectedFolder}\xBB \u043F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0439 \u0438\u043B\u0438 PDF.`);
          return;
        }
        new MaterialFileSuggestModal(this.app, files, async (file) => {
          this.plugin.settings.materialMap[item.requirement.id] = file.path;
          await this.plugin.saveSettings();
          this.preview();
        }).open();
      }));
      if (this.resolution.missing.length > 1) {
        wizardEl.createEl("details", {}, (details) => {
          details.createEl("summary", { text: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043E\u0441\u0442\u0430\u043B\u044C\u043D\u044B\u0435 \u043D\u0435\u0434\u043E\u0441\u0442\u0430\u044E\u0449\u0438\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B" });
          const list = details.createEl("ul");
          this.resolution.missing.slice(1).forEach((missing) => {
            list.createEl("li", { text: `${missing.requirement.displayName} \u2192 ${missing.expectedFolder}` });
          });
        });
      }
    }
    this.createSetting = new import_obsidian.Setting(this.contentEl).setDesc(this.resolution.missing.length ? "\u0417\u0430\u043C\u0435\u0442\u043A\u0443 \u043C\u043E\u0436\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u0441\u0435\u0439\u0447\u0430\u0441: \u043D\u0430 \u043C\u0435\u0441\u0442\u0435 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0445 \u0441\u0445\u0435\u043C \u043F\u043E\u044F\u0432\u044F\u0442\u0441\u044F \u043F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u044F." : "\u0412\u0441\u0435 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u044B\u0435 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B \u043D\u0430\u0439\u0434\u0435\u043D\u044B.").addButton((button) => button.setButtonText(this.resolution.missing.length ? "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0441 \u043F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u044F\u043C\u0438" : "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0443").setCta().onClick(async () => {
      if (this.creating) return;
      this.creating = true;
      button.setDisabled(true);
      try {
        const file = await this.plugin.createWorkoutNote(this.workout, this.resolution);
        new import_obsidian.Notice(`\u0422\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0430: ${file.path}`);
        this.close();
      } catch (error) {
        new import_obsidian.Notice(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0443: ${error.message}`);
        button.setDisabled(false);
      } finally {
        this.creating = false;
      }
    }));
  }
  renderLocalPreviews() {
    const gallery = this.resultEl.createDiv({ cls: "yoga-local-preview-gallery" });
    gallery.createEl("h4", { text: "\u041B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u043F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440" });
    this.workout.requiredMaterials.forEach((requirement) => {
      const match = this.resolution.matches.get(requirement.id);
      const card = gallery.createDiv({ cls: "yoga-local-preview-card" });
      card.createEl("strong", { text: requirement.displayName });
      if (!match?.file) {
        card.createDiv({ cls: "yoga-local-preview-missing", text: "\u0424\u0430\u0439\u043B \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D" });
        return;
      }
      const file = match.file;
      if (String(file.extension || "").toLocaleLowerCase("en") === "pdf") {
        card.createEl("a", { text: `\u041E\u0442\u043A\u0440\u044B\u0442\u044C PDF: ${file.name}`, href: this.app.vault.getResourcePath(file) });
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
        new import_obsidian.Notice(`\u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D: ${created.path}`);
        this.preview();
      } catch (error) {
        new import_obsidian.Notice(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B: ${error.message}`);
        button.setDisabled(false);
      }
    }, { once: true });
    input.click();
  }
  onClose() {
    this.contentEl.empty();
  }
};
var YogaWorkoutSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Yoga Workout Importer" });
    containerEl.createEl("p", {
      text: "\u041F\u043B\u0430\u0433\u0438\u043D \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E. \u041E\u043D \u043D\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0430\u0435\u0442\u0441\u044F \u043A Telegram \u0438 \u043D\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435 \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0430 \u043D\u0430\u0440\u0443\u0436\u0443."
    });
    containerEl.createEl("p", { text: `\u0412\u0435\u0440\u0441\u0438\u044F \u043F\u043B\u0430\u0433\u0438\u043D\u0430: ${PLUGIN_VERSION}` });
    new import_obsidian.Setting(containerEl).setName("\u041F\u0430\u043F\u043A\u0430 \u0441 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u0430\u043C\u0438").setDesc("\u041F\u043B\u0430\u0433\u0438\u043D \u0438\u0449\u0435\u0442 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0438 PDF \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u043D\u0443\u0442\u0440\u0438 \u044D\u0442\u043E\u0439 \u043F\u0430\u043F\u043A\u0438.").addText((text) => text.setPlaceholder(DEFAULT_SETTINGS.libraryFolder).setValue(this.plugin.settings.libraryFolder).onChange(async (value) => {
      this.plugin.settings.libraryFolder = cleanFolderPath(value, DEFAULT_SETTINGS.libraryFolder);
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(containerEl).setName("\u041F\u0430\u043F\u043A\u0430 \u0433\u043E\u0442\u043E\u0432\u044B\u0445 \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043E\u043A").setDesc("\u0421\u044E\u0434\u0430 \u0431\u0443\u0434\u0443\u0442 \u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u0442\u044C\u0441\u044F \u0441\u043E\u0437\u0434\u0430\u043D\u043D\u044B\u0435 Markdown-\u0437\u0430\u043C\u0435\u0442\u043A\u0438.").addText((text) => text.setPlaceholder(DEFAULT_SETTINGS.workoutsFolder).setValue(this.plugin.settings.workoutsFolder).onChange(async (value) => {
      this.plugin.settings.workoutsFolder = cleanFolderPath(value, DEFAULT_SETTINGS.workoutsFolder);
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(containerEl).setName("\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u0430\u043F\u043A\u0438").setDesc("\u0421\u043E\u0437\u0434\u0430\u0451\u0442 \u043F\u0430\u043F\u043A\u0438, \u0435\u0441\u043B\u0438 \u0438\u0445 \u0435\u0449\u0451 \u043D\u0435\u0442. \u0421\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u0444\u0430\u0439\u043B\u044B \u043D\u0435 \u0438\u0437\u043C\u0435\u043D\u044F\u044E\u0442\u0441\u044F.").addButton((button) => button.setButtonText("\u0421\u043E\u0437\u0434\u0430\u0442\u044C").onClick(async () => {
      await ensureFolder(this.app.vault, this.plugin.settings.libraryFolder);
      await Promise.all(["F1", "F2", "F3", "ZERO", "ON", "SURYA"].map(
        (folder) => ensureFolder(this.app.vault, `${this.plugin.settings.libraryFolder}/${folder}`)
      ));
      await ensureFolder(this.app.vault, this.plugin.settings.workoutsFolder);
      await ensureFolder(this.app.vault, `${this.plugin.settings.workoutsFolder}/\u0421\u0435\u0431\u0435`);
      new import_obsidian.Notice("\u041F\u0430\u043F\u043A\u0438 \u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440\u0430 \u0433\u043E\u0442\u043E\u0432\u044B.");
    }));
    new import_obsidian.Setting(containerEl).setName("\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0440\u0443\u0447\u043D\u044B\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u044F").setDesc("\u0417\u0430\u0431\u044B\u0432\u0430\u0435\u0442 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0435 \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u043F\u0430\u0440\u044B \xAB\u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C \u2192 \u0444\u0430\u0439\u043B\xBB, \u043D\u043E \u043D\u0435 \u0443\u0434\u0430\u043B\u044F\u0435\u0442 \u0441\u0430\u043C\u0438 \u0444\u0430\u0439\u043B\u044B.").addButton((button) => button.setButtonText("\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C").setWarning().onClick(async () => {
      this.plugin.settings.materialMap = {};
      await this.plugin.saveSettings();
      new import_obsidian.Notice("\u0420\u0443\u0447\u043D\u044B\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u044F \u0441\u0431\u0440\u043E\u0448\u0435\u043D\u044B. \u0424\u0430\u0439\u043B\u044B \u043D\u0435 \u0438\u0437\u043C\u0435\u043D\u044F\u043B\u0438\u0441\u044C.");
    }));
  }
};
var YogaWorkoutImporterPlugin = class extends import_obsidian.Plugin {
  async onload() {
    await this.loadSettings();
    this.addRibbonIcon("clipboard-paste", "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0443", () => this.openImporterFromClipboard());
    this.addRibbonIcon("pencil", "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0443", () => new ManualWorkoutModal(this.app, this).open());
    this.addCommand({
      id: "import-workout-from-clipboard",
      name: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0443 \u0438\u0437 \u0431\u0443\u0444\u0435\u0440\u0430 \u043E\u0431\u043C\u0435\u043D\u0430",
      callback: () => this.openImporterFromClipboard()
    });
    this.addCommand({
      id: "open-workout-importer",
      name: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0438\u043C\u043F\u043E\u0440\u0442\u0451\u0440 \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0438",
      callback: () => new WorkoutImportModal(this.app, this, "").open()
    });
    this.addCommand({
      id: "record-workout-manually",
      name: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0443",
      callback: () => new ManualWorkoutModal(this.app, this).open()
    });
    this.registerObsidianProtocolHandler("yoga-workout-importer", (params) => {
      try {
        const text = handoffWorkoutText(params.workout);
        new WorkoutImportModal(this.app, this, text, { handoff: true }).open();
      } catch (error) {
        new import_obsidian.Notice(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u043F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440: ${error.message}`);
      }
    });
    this.addSettingTab(new YogaWorkoutSettingTab(this.app, this));
  }
  async loadSettings() {
    const loaded = await this.loadData();
    this.settings = {
      ...DEFAULT_SETTINGS,
      ...loaded || {},
      materialMap: { ...DEFAULT_SETTINGS.materialMap, ...loaded?.materialMap || {} }
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
    }
    new WorkoutImportModal(this.app, this, clipboardText).open();
    if (!clipboardText) new import_obsidian.Notice("\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0432 \u043E\u0442\u043A\u0440\u044B\u0432\u0448\u0435\u0435\u0441\u044F \u043F\u043E\u043B\u0435.");
  }
  async createWorkoutNote(workout, resolution) {
    const outputFolder = cleanFolderPath(this.settings.workoutsFolder, DEFAULT_SETTINGS.workoutsFolder);
    const clientFolder = safeFolderName(workout.client);
    const ownerFolder = /^тренировка\s+yoga$/iu.test(clientFolder) ? "\u0421\u0435\u0431\u0435" : clientFolder || "\u0421\u0435\u0431\u0435";
    const destinationFolder = (0, import_obsidian.normalizePath)(`${outputFolder}/${ownerFolder}`);
    await ensureFolder(this.app.vault, destinationFolder);
    const prefix = workout.date ? `${workout.date} \u2014 ` : "";
    const baseName = safeFileName(`${prefix}${workout.title}`);
    let notePath = (0, import_obsidian.normalizePath)(`${destinationFolder}/${baseName}.md`);
    let suffix = 2;
    while (this.app.vault.getAbstractFileByPath(notePath)) {
      notePath = (0, import_obsidian.normalizePath)(`${destinationFolder}/${baseName} (${suffix}).md`);
      suffix += 1;
    }
    const markdown = buildWorkoutMarkdown(workout, resolution, (file2) => {
      const link = this.app.fileManager.generateMarkdownLink(file2, notePath);
      return link.startsWith("!") ? link : `!${link}`;
    });
    const file = await this.app.vault.create(notePath, markdown);
    await this.app.workspace.getLeaf("tab").openFile(file);
    return file;
  }
  async importMaterialFromDevice(requirement, expectedFolder, sourceFile) {
    const extension = getImportedFileExtension(sourceFile);
    if (!extension) {
      throw new Error("\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u044E\u0442\u0441\u044F PNG, JPG, WebP, GIF \u0438 PDF.");
    }
    if (Number(sourceFile.size || 0) > 25 * 1024 * 1024) {
      throw new Error("\u0424\u0430\u0439\u043B \u0431\u043E\u043B\u044C\u0448\u0435 25 \u041C\u0411. \u0423\u043C\u0435\u043D\u044C\u0448\u0438\u0442\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430.");
    }
    await ensureFolder(this.app.vault, expectedFolder);
    const baseName = safeFileName(requirement.displayName);
    let targetPath = (0, import_obsidian.normalizePath)(`${expectedFolder}/${baseName}.${extension}`);
    let suffix = 2;
    while (this.app.vault.getAbstractFileByPath(targetPath)) {
      targetPath = (0, import_obsidian.normalizePath)(`${expectedFolder}/${baseName} (${suffix}).${extension}`);
      suffix += 1;
    }
    const data = await sourceFile.arrayBuffer();
    const created = await this.app.vault.createBinary(targetPath, data);
    this.settings.materialMap[requirement.id] = created.path;
    await this.saveSettings();
    return created;
  }
};
