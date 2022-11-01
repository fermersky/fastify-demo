import assert from "node:assert";
import { it, describe, beforeEach } from "node:test";
import build from "../app.js";
import settings from "../settings.js";

describe("AUTH ROUTE", () => {
  let app;

  beforeEach(async () => {
    app = await build(settings.test);
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
