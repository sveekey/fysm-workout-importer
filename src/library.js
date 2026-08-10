import { normalizeMaterialName } from "./parser.js";

const SUPPORTED_EXTENSIONS = new Set(["png", "jpg", "jpeg", "webp", "gif", "svg", "pdf"]);

export function isSupportedMaterialFile(file) {
  return !!file && SUPPORTED_EXTENSIONS.has(String(file.extension || "").toLocaleLowerCase("en"));
}

function isInsideFolder(filePath, folderPath) {
  const folder = String(folderPath || "").replace(/^\/+|\/+$/g, "");
  if (!folder) return true;
  return filePath === folder || filePath.startsWith(`${folder}/`);
}

export function getRequirementFolder(libraryFolder, requirement) {
  const root = String(libraryFolder || "").replace(/^\/+|\/+$/g, "");
  let child = "";
  if (requirement.kind === "algorithm" && ["FYSM 1", "FYSM 2", "FYSM 3"].includes(requirement.set)) {
    child = requirement.set;
  } else if (requirement.kind === "warmup" && normalizeMaterialName(requirement.displayName).startsWith("zero ")) {
    child = "ZERO";
  } else if (requirement.kind === "warmup" && normalizeMaterialName(requirement.displayName).startsWith("сурья намаскар ")) {
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

  const withoutSetPrefix = basename.replace(/^fysm\s*[123]\s+/u, "");
  if (withoutSetPrefix === wanted) return 92;
  if (wanted.length >= 5 && (basename.startsWith(`${wanted} `) || basename.endsWith(` ${wanted}`))) return 75;
  if (wanted.length >= 5 && pathWithoutExtension.endsWith(` ${wanted}`)) return 70;
  return 0;
}

export function listMaterialFiles(app, libraryFolder = "") {
  return app.vault.getFiles()
    .filter(isSupportedMaterialFile)
    .filter(file => isInsideFolder(file.path, libraryFolder));
}

export function resolveWorkoutMaterials(app, workout, settings) {
  const files = listMaterialFiles(app, settings.libraryFolder);
  const byPath = new Map(files.map(file => [file.path, file]));
  const matches = new Map();
  const missing = [];

  for (const requirement of workout.requiredMaterials) {
    const expectedFolder = getRequirementFolder(settings.libraryFolder, requirement);
    const eligibleFiles = files.filter(file => isInsideFolder(file.path, expectedFolder));
    const mappedPath = settings.materialMap?.[requirement.id];
    const mappedFile = mappedPath ? app.vault.getAbstractFileByPath(mappedPath) : null;
    if (mappedFile && isSupportedMaterialFile(mappedFile) && isInsideFolder(mappedFile.path, expectedFolder)) {
      matches.set(requirement.id, { requirement, file: mappedFile, source: "manual" });
      continue;
    }

    const scored = eligibleFiles
      .map(file => ({ file, score: scoreCandidate(requirement, file) }))
      .filter(candidate => candidate.score > 0)
      .sort((left, right) => right.score - left.score || left.file.path.localeCompare(right.file.path, "ru"));

    const bestScore = scored[0]?.score || 0;
    const best = scored.filter(candidate => candidate.score === bestScore);
    if (bestScore > 0 && best.length === 1) {
      matches.set(requirement.id, { requirement, file: best[0].file, source: "automatic" });
    } else {
      missing.push({
        requirement,
        expectedFolder,
        candidates: best.slice(0, 5).map(candidate => candidate.file),
        reason: best.length > 1 ? "ambiguous" : "missing"
      });
    }
  }

  return { matches, missing, filesByPath: byPath };
}
