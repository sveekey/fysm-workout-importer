import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { FYSM_ALGORITHMS, findAlgorithmSet } from "../src/catalog.js";

test("local names-only catalog resolves algorithm levels", () => {
  assert.equal(Object.keys(FYSM_ALGORITHMS).length, 4);
  assert.equal(findAlgorithmSet("Струна"), "FYSM 1");
  assert.equal(findAlgorithmSet("Активация центра"), "FYSM 2");
  assert.equal(findAlgorithmSet("Кайрос"), "FYSM 3");
});

const botDataUrl = new URL("../../../src/data.js", import.meta.url);

if (existsSync(fileURLToPath(botDataUrl))) {
  test("local names-only catalog stays aligned with the bot data", async () => {
    const { FYSM_ALGOS } = await import(botDataUrl.href);
    assert.deepEqual(FYSM_ALGORITHMS, FYSM_ALGOS);
  });
}
