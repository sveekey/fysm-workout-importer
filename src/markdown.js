function yamlString(value = "") {
  return JSON.stringify(String(value));
}

function materialBlock(requirement, match, makeEmbed) {
  if (match?.file) return makeEmbed(match.file);
  return `> [!warning] Схема не найдена\n> Добавьте локальный материал «${requirement.displayName}» через импортёр FYSM.`;
}

function findRequirement(workout, kind, displayName) {
  return workout.requiredMaterials.find(item => item.kind === kind && item.displayName === displayName);
}

function setEmoji(set = "") {
  return {
    "FYSM 1": "1️⃣",
    "FYSM 2": "2️⃣",
    "FYSM 3": "3️⃣",
    LITE: "⏺️"
  }[set] || "";
}

function warmupCardLine(warmup) {
  const repetitions = warmup.repetitions ? ` на **${warmup.repetitions}**` : "";
  if (warmup.type === "zero") {
    const sequence = warmup.sequence.length ? ` ( ${warmup.sequence.join(", ")} )` : "";
    return `🥌 **ZERO**${sequence}${repetitions}`;
  }
  const icon = warmup.type === "surya" ? "☀️" : "🗿";
  const rounds = warmup.type === "static" || warmup.type === "surya"
    ? warmup.repetitions ? " кругов" : ""
    : "";
  return `${icon} **${warmup.name}**${repetitions}${rounds}`;
}

export function buildWorkoutMarkdown(workout, resolution, makeEmbed) {
  const lines = [
    "---",
    `title: ${yamlString(workout.title)}`,
    workout.date ? `date: ${yamlString(workout.date)}` : "",
    workout.client ? `client: ${yamlString(workout.client)}` : "",
    "source: FYSM Boy",
    "fysm_imported: true",
    "tags:",
    "  - fysm/training",
    "---",
    "",
    `**«${workout.title}»**`,
    ""
  ].filter(line => line !== "");

  const meta = [];
  if (workout.date) meta.push(`• **Дата**: ${workout.date}`);
  if (workout.client) meta.push(`• **Клиент**: ${workout.client}`);
  if (workout.level) meta.push(`• **Уровень**: ${workout.level}`);
  if (workout.estimatedMinutes) meta.push(`• **Расчетное время:** **⏱** ~${workout.estimatedMinutes} мин`);
  meta.push(`• **Метроном**: ${workout.metronome}`);
  meta.push(`• **ON**: ${warmupCardLine(workout.warmup)}`);
  if (workout.algorithms.length) {
    meta.push("• **Алгоритмы**:");
    workout.algorithms.forEach((algorithm, index) => {
      const prefix = [setEmoji(algorithm.set), `**${algorithm.name}**`, algorithm.zone].filter(Boolean).join(" ");
      meta.push(`${index + 1}) ${prefix}${algorithm.mode ? ` — **${algorithm.mode}**` : ""}`);
    });
  } else {
    meta.push("• **Алгоритмы**: нет");
  }
  lines.push(...meta, "", "## ON", "");

  if (workout.warmup.type === "zero") {
    lines.push(`**ZERO**${workout.warmup.repetitions ? ` — ${workout.warmup.repetitions}` : ""}`, "");
    if (!workout.warmup.sequence.length) {
      lines.push("> [!warning] В сообщении не было конкретных номеров ZERO.", "");
    }
    for (const number of workout.warmup.sequence) {
      const displayName = `ZERO ${number}`;
      const requirement = findRequirement(workout, "warmup", displayName);
      const match = requirement ? resolution.matches.get(requirement.id) : null;
      lines.push(`### ${displayName}`, "", materialBlock(requirement || { displayName }, match, makeEmbed), "");
    }
  } else {
    lines.push(`**${workout.warmup.name}**${workout.warmup.repetitions ? ` — ${workout.warmup.repetitions}` : ""}`, "");
    const requirement = findRequirement(workout, "warmup", workout.warmup.name);
    if (requirement) {
      lines.push(materialBlock(requirement, resolution.matches.get(requirement.id), makeEmbed), "");
    }
  }

  lines.push("## Алгоритмы", "");
  if (!workout.algorithms.length) {
    lines.push("Алгоритмов нет.", "");
  }

  workout.algorithms.forEach((algorithm, index) => {
    lines.push(`### ${index + 1}. ${algorithm.name}`, "");
    const details = [algorithm.set, algorithm.mode].filter(Boolean).join(" · ");
    if (details) lines.push(`**${details}**`, "");
    const requirement = findRequirement(workout, "algorithm", algorithm.name);
    if (requirement) {
      lines.push(materialBlock(requirement, resolution.matches.get(requirement.id), makeEmbed), "");
    }
  });

  if (workout.comment) lines.push("## Комментарий", "", workout.comment, "");
  lines.push("---", "*Создано локально из скопированного текста. Материалы не передавались в Telegram или на внешний сервер.*", "");
  return `${lines.join("\n").replace(/\n{3,}/g, "\n\n")}\n`;
}
