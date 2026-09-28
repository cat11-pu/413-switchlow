import assert from "node:assert";
import { spanOf, denseEnough, gapsOf } from "../switchlow.js";
import { step, close } from "../switchrun.js";
import { render } from "../app.js";

const base = {
  budget: 1, span: 8,
  state: { cases: [], lowers: [], tables: 0, chains: 0, ledger: [], applied: [] },
  events: [{ id: 1, kind: "case", value: 3 }],
  bad_value_code: "E_BAD_VALUE", dup_code: "E_DUP",
  empty_code: "E_EMPTY", event_error_code: "E_BAD_EVENT"
};

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("spanOf returns a number", () => {
  assert.strictEqual(typeof spanOf([3, 7]), "number");
});

check("denseEnough returns a boolean", () => {
  assert.strictEqual(typeof denseEnough(5, 8), "boolean");
});

check("gapsOf returns a number", () => {
  assert.strictEqual(typeof gapsOf([3, 4, 7]), "number");
});

check("step returns a state", () => {
  assert.strictEqual(typeof step(base).state, "object");
});

check("render counts events", () => {
  assert.strictEqual(typeof render(base).count_events, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
