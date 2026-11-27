import assert from "node:assert/strict";
import test from "node:test";
import { adminOnly } from "../src/utils/adminAccess.ts";

test("hides administrative actions in visitor mode", () => {
  const action = () => "edit";

  assert.equal(adminOnly(false, action), undefined);
});

test("keeps administrative actions in administrator mode", () => {
  const action = () => "edit";

  assert.equal(adminOnly(true, action), action);
});
