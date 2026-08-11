import assert from "node:assert/strict";
import test from "node:test";
import { resolveWorkoutMaterials } from "../src/library.js";

function fakeFile(path) {
  const name = path.split("/").at(-1);
  const extension = name.split(".").at(-1);
  return {
    path,
    name,
    extension,
    basename: name.slice(0, -(extension.length + 1))
  };
}

function fakeApp(paths) {
  const files = paths.map(fakeFile);
  const byPath = new Map(files.map(file => [file.path, file]));
  return {
    vault: {
      getFiles: () => files,
      getAbstractFileByPath: path => byPath.get(path) || null
    }
  };
}

test("matches exact material names only inside the configured library", () => {
  const app = fakeApp([
    "Конструктор тренировок/Материалы/ZERO/ZERO 12.png",
    "Конструктор тренировок/Материалы/F2/Активация центра.jpg",
    "Другая папка/Струна.png"
  ]);
  const workout = {
    requiredMaterials: [
      { id: "warmup:zero 12", kind: "warmup", displayName: "ZERO 12", set: "" },
      { id: "algorithm:активация центра", kind: "algorithm", displayName: "Активация центра", set: "F2" },
      { id: "algorithm:струна", kind: "algorithm", displayName: "Струна", set: "F1" }
    ]
  };

  const result = resolveWorkoutMaterials(app, workout, {
    libraryFolder: "Конструктор тренировок/Материалы",
    materialMap: {}
  });

  assert.equal(result.matches.get("warmup:zero 12").file.path, "Конструктор тренировок/Материалы/ZERO/ZERO 12.png");
  assert.equal(result.matches.get("algorithm:активация центра").file.path, "Конструктор тренировок/Материалы/F2/Активация центра.jpg");
  assert.deepEqual(result.missing.map(item => item.requirement.displayName), ["Струна"]);
  assert.equal(result.missing[0].expectedFolder, "Конструктор тренировок/Материалы/F1");
});

test("prefers a manual local mapping", () => {
  const app = fakeApp([
    "Конструктор тренировок/Материалы/F1/Мой скриншот.png",
    "Конструктор тренировок/Материалы/F1/Струна.png"
  ]);
  const workout = {
    requiredMaterials: [
      { id: "algorithm:струна", kind: "algorithm", displayName: "Струна", set: "F1" }
    ]
  };

  const result = resolveWorkoutMaterials(app, workout, {
    libraryFolder: "Конструктор тренировок/Материалы",
    materialMap: { "algorithm:струна": "Конструктор тренировок/Материалы/F1/Мой скриншот.png" }
  });

  assert.equal(result.matches.get("algorithm:струна").file.path, "Конструктор тренировок/Материалы/F1/Мой скриншот.png");
  assert.equal(result.matches.get("algorithm:струна").source, "manual");
});

test("does not accept an algorithm file from the wrong level folder", () => {
  const app = fakeApp(["Конструктор тренировок/Материалы/F2/Струна.png"]);
  const workout = {
    requiredMaterials: [
      { id: "algorithm:струна", kind: "algorithm", displayName: "Струна", set: "F1" }
    ]
  };

  const result = resolveWorkoutMaterials(app, workout, {
    libraryFolder: "Конструктор тренировок/Материалы",
    materialMap: {}
  });

  assert.equal(result.matches.size, 0);
  assert.equal(result.missing[0].expectedFolder, "Конструктор тренировок/Материалы/F1");
});

test("routes Surya, ZERO and ON to separate sibling folders", () => {
  const app = fakeApp([
    "Конструктор тренировок/Материалы/SURYA/Сурья Намаскар 1.png",
    "Конструктор тренировок/Материалы/ZERO/ZERO 12.png",
    "Конструктор тренировок/Материалы/ON/ON 10.png"
  ]);
  const workout = {
    requiredMaterials: [
      { id: "warmup:сурья намаскар 1", kind: "warmup", displayName: "Сурья Намаскар 1", set: "" },
      { id: "warmup:zero 12", kind: "warmup", displayName: "ZERO 12", set: "" },
      { id: "warmup:on 10", kind: "warmup", displayName: "ON 10", set: "" }
    ]
  };

  const result = resolveWorkoutMaterials(app, workout, {
    libraryFolder: "Конструктор тренировок/Материалы",
    materialMap: {}
  });

  assert.equal(result.matches.get("warmup:сурья намаскар 1").file.path, "Конструктор тренировок/Материалы/SURYA/Сурья Намаскар 1.png");
  assert.equal(result.matches.get("warmup:zero 12").file.path, "Конструктор тренировок/Материалы/ZERO/ZERO 12.png");
  assert.equal(result.matches.get("warmup:on 10").file.path, "Конструктор тренировок/Материалы/ON/ON 10.png");
});
