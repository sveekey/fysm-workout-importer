import assert from "node:assert/strict";
import test from "node:test";
import { buildWorkoutMarkdown } from "../src/markdown.js";
import { parseWorkoutText } from "../src/parser.js";

test("builds a local note with embeds and no source URLs", () => {
  const workout = parseWorkoutText(`
«Локальная тренировка»
• Дата: 2026-08-10
• Уровень: Base
• Метроном: 20
• ON: ZERO (_12) на 8
• Алгоритмы:
1) 1️⃣ <a href="https://copyright.example/material">Струна</a> — 3х5
  `);
  const resolution = { matches: new Map(), missing: [] };
  for (const requirement of workout.requiredMaterials) {
    resolution.matches.set(requirement.id, {
      requirement,
      file: { path: `FYSM/Методички/${requirement.displayName}.png` }
    });
  }

  const markdown = buildWorkoutMarkdown(workout, resolution, file => `![[${file.path}]]`);
  assert.match(markdown, /- \*\*Включение:\*\* ZERO 12 — 8/u);
  assert.match(markdown, /- \*\*Алгоритмы:\*\*\n    1\. \*\*Струна\*\* — FYSM 1 · 3х5/u);
  assert.match(markdown, /!\[\[FYSM\/Методички\/ZERO 12\.png\]\]/u);
  assert.match(markdown, /!\[\[FYSM\/Методички\/Струна\.png\]\]/u);
  assert.doesNotMatch(markdown, /https?:\/\//u);
});

test("marks a missing local scheme without failing note generation", () => {
  const workout = parseWorkoutText(`
«Неполная библиотека»
• Дата: 2026-08-10
• Уровень: Base
• Метроном: 20
• ON: ON 10 на 8 кругов
• Алгоритмы: нет
  `);
  const resolution = { matches: new Map(), missing: workout.requiredMaterials };
  const markdown = buildWorkoutMarkdown(workout, resolution, () => "");

  assert.match(markdown, /> \[!warning\] Схема не найдена/u);
  assert.match(markdown, /ON 10/u);
  assert.match(markdown, /- \*\*Алгоритмы:\*\* нет/u);
});

test("adds an explicitly detected client to note metadata", () => {
  const workout = parseWorkoutText(`
«Клиентская тренировка»
• Дата: 2026-08-10
• Уровень: Base
• Метроном: 20
• ON: Статика на 8 кругов
• Алгоритмы: нет
• Комментарий: Клиент: Анна
  `);
  const markdown = buildWorkoutMarkdown(workout, {
    matches: new Map(),
    missing: workout.requiredMaterials
  }, file => `![[${file.path}]]`);

  assert.match(markdown, /client: "Анна"/u);
  assert.match(markdown, /\*\*Клиент:\*\* Анна/u);
});
