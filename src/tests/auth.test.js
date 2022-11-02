import assert from "node:assert";
import { before, describe, it } from "node:test";

import build from "../app.js";
import settings from "../settings.js";

describe("/auth/login", () => {
  let app;

  before(async () => {
    app = await build(settings.test);
  });

  it("Correct credentials", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: {
        email: "andrew@mail.com",
        password: "123",
      },
    });

    assert.equal(response.statusCode, 200);
    assert.ok(typeof response.json().token === "string");
  });

  it("Incorrect password", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: {
        email: "andrew@mail.com",
        password: "THIS PASSWORD IS NOT CORRECT",
      },
    });

    assert.equal(response.statusCode, 401);
  });
});
