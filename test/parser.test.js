import assert from "node:assert/strict";
import test from "node:test";
import { extractClientName, parseWorkoutText } from "../src/parser.js";

test("parses a generated workout with ZERO and algorithms", () => {
  const workout = parseWorkoutText(`
📝 Сформированная тренировка.

⏱ Расчетное время: ~52 мин

«Тихий центр»
• Дата: 2026-08-10
• Уровень: 🦅 Dense
• Метроном: 20
• ON: 🥌 ZERO ( _08, 12 ) на 4х4
• Алгоритмы:
1) 1️⃣ Струна 🔼 — 3X5
2) 2️⃣ Активация центра 🔽 — 40 секунд
• Комментарий: Мягкая практика

Что делаем дальше?
  `);

  assert.equal(workout.title, "Тихий центр");
  assert.equal(workout.date, "2026-08-10");
  assert.equal(workout.estimatedMinutes, 52);
  assert.deepEqual(workout.warmup.sequence, [8, 12]);
  assert.equal(workout.warmup.repetitions, "4х4");
  assert.deepEqual(workout.algorithms, [
    { index: 1, name: "Струна", set: "F1", mode: "3х5", zone: "🔼" },
    { index: 2, name: "Активация центра", set: "F2", mode: "40 секунд", zone: "🔽" }
  ]);
  assert.deepEqual(workout.requiredMaterials.map(item => item.displayName), ["ZERO 8", "ZERO 12", "Струна", "Активация центра"]);
});

test("parses HTML-formatted Telegram source text", () => {
  const workout = parseWorkoutText(`
<b>«Солнечный круг»</b>
• <b>Дата</b>: 2026-08-11
• <b>Уровень</b>: Base
• <b>Метроном</b>: <b>30</b>
• <b>ON</b>: ☀️ <b><a href="https://example.invalid">Сурья Намаскар 1</a></b> на <b>9</b> кругов
• <b>Алгоритмы</b>: <b>нет</b>
  `);

  assert.equal(workout.title, "Солнечный круг");
  assert.equal(workout.warmup.type, "surya");
  assert.equal(workout.warmup.name, "Сурья Намаскар 1");
  assert.equal(workout.warmup.repetitions, "9");
  assert.equal(workout.algorithms.length, 0);
  assert.deepEqual(workout.requiredMaterials.map(item => item.displayName), ["Сурья Намаскар 1"]);
});

test("does not require a material for plain static warmup or Yoga LITE", () => {
  const workout = parseWorkoutText(`
«Без схем»
• Дата: 2026-08-12
• Уровень: без алгоритмов
• Метроном: 20
• ON: 🗿 Статика на 8 кругов
• Алгоритмы:
1) ⏺️ Yoga LITE — 5 минут
  `);

  assert.equal(workout.warmup.type, "static");
  assert.equal(workout.warmup.repetitions, "8");
  assert.deepEqual(workout.requiredMaterials, []);
});

test("uses 20 as the metronome default when the field is absent", () => {
  const workout = parseWorkoutText(`
«Без метронома»
• ON: Статика на 8 кругов
• Алгоритмы: нет
  `);

  assert.equal(workout.metronome, "20");
});

test("rejects an unrelated clipboard value", () => {
  assert.throws(
    () => parseWorkoutText("Просто сообщение из Telegram"),
    /ON/u
  );
});

test("extracts an explicitly marked client from known bot comments", () => {
  assert.equal(extractClientName("🔮 Оракул для: Анна"), "Анна");
  assert.equal(extractClientName("🍪 Пиифия для Мария Иванова: мягкая практика"), "Мария Иванова");
  assert.equal(extractClientName('🗂 Курс "Баланс" | by trainer | 👤 Леся'), "Леся");
  assert.equal(extractClientName("Клиент: Юлия | восстановление"), "Юлия");
  assert.equal(extractClientName("Для клиента: Олег"), "Олег");
});

test("does not turn an ordinary comment into a client folder", () => {
  assert.equal(extractClientName("Мягкая практика для спины клиента"), "");
  assert.equal(extractClientName("Себе"), "");
});
