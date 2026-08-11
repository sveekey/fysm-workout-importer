import assert from "node:assert/strict";
import test from "node:test";
import { YOGA_ALGORITHMS, findAlgorithmSet } from "../src/catalog.js";

test("local names-only catalog resolves algorithm levels", () => {
  assert.equal(Object.keys(YOGA_ALGORITHMS).length, 4);
  assert.equal(findAlgorithmSet("Струна"), "F1");
  assert.equal(findAlgorithmSet("Активация центра"), "F2");
  assert.equal(findAlgorithmSet("Кайрос"), "F3");
});
