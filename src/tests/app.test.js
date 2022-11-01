import assert from "node:assert";
import { it, describe, beforeEach } from "node:test";
import build from "../app.js";
import { test } from "../env.js";

describe("AUTH ROUTE", () => {
  let app;

  beforeEach(async () => {
    app = await build(test);
  });

  it("/auth/login", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: {
        email: "123",
        password: "123",
      },
    });

    assert.equal(response.statusCode, 200);
  });
});
