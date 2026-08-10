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

export function buildWorkoutMarkdown(workout, resolution, makeEmbed) {
  const lines = [
    "---",
    `title: ${yamlString(workout.title)}`,
    workout.date ? `date: ${yamlString(workout.date)}` : "",
    "source: FYSM Boy",
    "fysm_imported: true",
    "tags:",
    "  - fysm/training",
    "---",
    "",
    `# ${workout.title}`,
    ""
  ].filter(line => line !== "");

  const meta = [];
  if (workout.date) meta.push(`- **Дата:** ${workout.date}`);
  if (workout.level) meta.push(`- **Уровень:** ${workout.level}`);
  if (workout.estimatedMinutes) meta.push(`- **Расчётное время:** ~${workout.estimatedMinutes} мин`);
  meta.push(`- **Метроном:** ${workout.metronome}`);
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
