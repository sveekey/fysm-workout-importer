import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { YOGA_ALGORITHMS, findAlgorithmSet } from "../src/catalog.js";

test("local names-only catalog resolves algorithm levels", () => {
  assert.equal(Object.keys(YOGA_ALGORITHMS).length, 4);
  assert.equal(findAlgorithmSet("Струна"), "F1");
  assert.equal(findAlgorithmSet("Активация центра"), "F2");
  assert.equal(findAlgorithmSet("Кайрос"), "F3");
});

const botDataUrl = new URL("../../../src/data.js", import.meta.url);

if (existsSync(fileURLToPath(botDataUrl))) {
  test("local names-only catalog stays aligned with the bot data", async () => {
    const { FYSM_ALGOS } = await import(botDataUrl.href);
    assert.deepEqual(YOGA_ALGORITHMS, Object.fromEntries(Object.entries(FYSM_ALGOS).map(([key, value]) => [
      { "FYSM 1": "F1", "FYSM 2": "F2", "FYSM 3": "F3" }[key] || key,
      value
    ])));
  });
}
