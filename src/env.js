import "dotenv/config";
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

export const dotenv = {
  logger: true,
  mode: "default",
  env: {
    confKey: CONFIG_KEY,
    schema: confSchema,
  },
};

export const test = {
  logger: false,
  mode: "testing",
  env: {
    confKey: CONFIG_KEY,
    schema: confSchema,
    data: {
      ENV: "testing",
    },
  },
};
