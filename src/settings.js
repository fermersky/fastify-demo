import assert from "node:assert";

const CONFIG_KEY = "config";

const confSchema = {
  type: "object",
  required: ["PORT", "ENV", "JWT_SECRET"],
  properties: {
    PORT: {
      type: "string",
      default: 5000,
    },
    ENV: {
      type: "string",
      default: "development",
    },
    JWT_SECRET: {
      type: "string",
      default: "secret",
    },
  },
};

export class AppSettings {
  /**
   *
   * @param {boolean} logger
   * @param {"default" | "testing"} mode
   * @param {object} env
   */
  constructor(logger, mode, env) {
    // validation
    assert.equal(typeof logger, "boolean", "logger must be a boolean");
    assert.ok(["default", "testing"].includes(mode), "mode must be either default or testing");

    this.logger = logger;
    this.mode = mode;
    this.env = env;
  }
}

export default {
  dotenv: new AppSettings(true, "default", {
    confKey: CONFIG_KEY,
    schema: confSchema,
    dotenv: true,
  }),
  test: new AppSettings(false, "testing", {
    confKey: CONFIG_KEY,
    schema: confSchema,
    data: {
      ENV: "testing",
    },
    dotenv: true,
  }),
};
