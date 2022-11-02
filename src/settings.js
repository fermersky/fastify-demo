import "dotenv/config";
import { Validator } from "jsonschema";

const CONFIG_KEY = "config";

const confSchema = {
  type: "object",
  required: [
    "PORT",
    "ENV",
    "JWT_SECRET",
    "POSTGRES_HOST",
    "POSTGRES_PORT",
    "POSTGRES_USER",
    "POSTGRES_PASSWORD",
    "POSTGRES_DATABASE",
  ],
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
    CORS_ORIGINS: {
      type: "string",
    },
    POSTGRES_HOST: {
      type: "string",
    },
    POSTGRES_PORT: {
      type: "string",
    },
    POSTGRES_USER: {
      type: "string",
    },
    POSTGRES_PASSWORD: {
      type: "string",
    },
    POSTGRES_DATABASE: {
      type: "string",
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
    this.#validate(logger, mode, env);

    this.logger = logger;
    this.mode = mode;
    this.env = env;
  }

  #validate(logger, mode, env) {
    const v = new Validator();

    const schema = {
      type: "object",
      required: ["logger", "mode", "env"],
      properties: {
        logger: {
          type: ["boolean", "object"],
        },
        mode: {
          type: "string",
          enum: ["default", "testing"],
        },
        env: {
          type: "object",
        },
      },
    };

    v.validate({ logger, mode, env }, schema, { throwFirst: true });
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
      POSTGRES_DATABASE: "test",
    },
    dotenv: true,
  }),
};
