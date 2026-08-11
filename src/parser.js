import { findAlgorithmSet } from "./catalog.js";

const FIELD_PREFIX_RE = /^\s*[•·*-]?\s*/u;

export class WorkoutParseError extends Error {
  constructor(message) {
    super(message);
    this.name = "WorkoutParseError";
  }
}

function decodeBasicHtmlEntities(value = "") {
  return String(value)
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
}

export function stripTelegramFormatting(value = "") {
  return decodeBasicHtmlEntities(String(value))
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\*\*/g, "")
    .replace(/\s*\(https?:\/\/[^)]+\)/gi, "")
    .replace(/\r\n?/g, "\n");
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
  return String(value)
    .replace(/\s+/g, " ")
    .replace(/^\s*[🥌☀️🗿]\s*/u, "")
    .trim();
}

function cleanClientName(value = "") {
  const name = cleanInline(value)
    .replace(/^[«“"']+|[»”"']+$/gu, "")
    .replace(/[.,;]+$/gu, "")
    .trim();
  if (!name || name.length > 100 || /^(?:себе|self|тренировка\s+yoga)$/iu.test(name)) return "";
  return name;
}

export function extractClientName(comment = "") {
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
  return cleanInline(value).replace(/[xXхХ]/g, "х");
}

function normalizeZone(value = "") {
  if (value === "🔼" || value === "⬆️") return "🔼";
  if (value === "🔽" || value === "⬇️") return "🔽";
  if (value === "⏺️") return "⏺️";
  return "";
}

function parseTitle(lines) {
  for (const rawLine of lines.slice(0, 12)) {
    const line = rawLine.trim();
    const match = line.match(/^[«“](.+?)[»”]$/u) || line.match(/[«“](.+?)[»”]/u);
    if (match && match[1] && !match[1].includes("—")) return match[1].trim();
  }
  return "Тренировка Yoga";
}

function parseEstimatedMinutes(text) {
  const match = text.match(/(?:Расчетное|Расчётное|Уточнённое)\s+время[^\d]{0,30}~?(\d+)\s*мин/iu);
  return match ? Number.parseInt(match[1], 10) : null;
}

function parseWarmup(rawValue) {
  const value = cleanInline(rawValue);
  if (!value) throw new WorkoutParseError("Не найдено описание ON.");

  if (/\bZERO\b/iu.test(value)) {
    const sequencePart = value.match(/\(([^)]*)\)/u)?.[1] || "";
    const sequence = [...sequencePart.matchAll(/\d+/g)]
      .map(match => Number.parseInt(match[0], 10))
      .filter(Number.isFinite);
    const repetitions = cleanInline(value.match(/(?:^|\s)на\s+(.+)$/iu)?.[1] || "")
      .replace(/\s*(?:кругов|круга|круг)\s*$/iu, "")
      .trim();
    return { type: "zero", name: "ZERO", sequence, repetitions };
  }

  if (/Сурья\s+Намаскар|Приветств\w*(?:\s+Солнцу)?/iu.test(value)) {
    const name = value.match(/Сурья\s+Намаскар\s*\d*/iu)?.[0]?.trim() || "Сурья Намаскар 1";
    const repetitions = cleanInline(value.match(/(?:^|\s)на\s+(.+)$/iu)?.[1] || "")
      .replace(/\s*(?:кругов|круга|круг)\s*$/iu, "")
      .trim();
    return { type: "surya", name, sequence: [], repetitions };
  }

  const name = value.match(/\bON\s*\d+\b/iu)?.[0]?.replace(/ON\s*/iu, "ON ")
    || (value.match(/\bСтатика\b/iu) ? "Статика" : value.split(/\s+на\s+/iu)[0].trim());
  const repetitions = cleanInline(value.match(/(?:^|\s)на\s+(.+)$/iu)?.[1] || "")
    .replace(/\s*(?:кругов|круга|круг)\s*$/iu, "")
    .trim();
  return { type: "static", name, sequence: [], repetitions };
}

function parseAlgorithms(lines) {
  const startIndex = lines.findIndex(rawLine => {
    const line = rawLine.replace(FIELD_PREFIX_RE, "").trim();
    return /^Алгоритмы\s*:/iu.test(line);
  });
  if (startIndex < 0) throw new WorkoutParseError("Не найден блок «Алгоритмы».");

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
    if (left.includes("1️⃣")) set = "F1";
    else if (left.includes("2️⃣")) set = "F2";
    else if (left.includes("3️⃣")) set = "F3";
    else if (left.includes("⏺️")) set = "LITE";

    const zone = normalizeZone(left.match(/🔼|🔽|⏺️|⬆️|⬇️/u)?.[0]);

    const name = left
      .replace(/^(?:1️⃣|2️⃣|3️⃣|⏺️)\s*/u, "")
      .replace(/\s*(?:🔼|🔽|⏺️|⬆️|⬇️)\s*$/u, "")
      .trim();

    if (name) {
      const catalogSet = findAlgorithmSet(name);
      algorithms.push({
        index: Number.parseInt(match[1], 10),
        name,
        set: catalogSet || set,
        mode: normalizeMode(match[3]),
        ...(zone ? { zone } : {})
      });
    }
  }
  return algorithms;
}

export function normalizeMaterialName(value = "") {
  return String(value)
    .normalize("NFKC")
    .toLocaleLowerCase("ru")
    .replace(/ё/g, "е")
    .replace(/[_–—-]+/g, " ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\b0+(\d+)\b/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

export function getRequiredMaterials(workout) {
  const result = [];
  const seen = new Set();
  const add = (kind, displayName, set = "") => {
    const normalized = normalizeMaterialName(displayName);
    if (!normalized) return;
    const id = `${kind}:${normalized}`;
    if (seen.has(id)) return;
    seen.add(id);
    result.push({ id, kind, displayName, set });
  };

  if (workout.warmup.type === "zero") {
    workout.warmup.sequence.forEach(number => add("warmup", `ZERO ${number}`));
  } else if (workout.warmup.name && workout.warmup.name !== "Статика") {
    add("warmup", workout.warmup.name);
  }

  workout.algorithms.forEach(algorithm => {
    if (["F1", "F2", "F3"].includes(algorithm.set)) {
      add("algorithm", algorithm.name, algorithm.set);
    }
  });
  return result;
}

export function parseWorkoutText(rawText) {
  const text = stripTelegramFormatting(rawText).trim();
  if (!text) throw new WorkoutParseError("Вставьте текст тренировки из Telegram.");

  const lines = text.split("\n").map(line => line.trimEnd());
  const date = fieldValue(lines, "Дата");
  const metronome = fieldValue(lines, "Метроном") || "20";
  const onValue = fieldValue(lines, "ON");

  if (!onValue) throw new WorkoutParseError("Не найдено поле «ON». Скопируйте сообщение тренировки целиком.");

  const comment = cleanInline(fieldValue(lines, "Комментарий"));
  const workout = {
    title: parseTitle(lines),
    date: date.match(/\d{4}-\d{2}-\d{2}/u)?.[0] || date,
    level: cleanInline(fieldValue(lines, "Уровень")),
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
