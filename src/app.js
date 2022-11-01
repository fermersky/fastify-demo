import Fastify from "fastify";
import fp from "fastify-plugin";
import Env from "@fastify/env";
import Cors from "@fastify/cors";
import auth from "./api/auth/auth.js";

import testingCore from "./core/testing.js";
import defaultCore from "./core/default.js";

// eslint-disable-next-line no-unused-vars
import { AppSettings } from "./settings.js";

/**
 * Initializes fastify app
 *
 * @param {AppSettings} options
 * @returns {FastifyInstance}
 */
const build = async (options) => {
  const app = Fastify({
    logger: options.logger,
  });

  const modeToModule = {
    testing: testingCore,
    default: defaultCore,
  };

  // Initialize fastify.settings from the .env file
  app.register(Env, options.env);

  // CORS
  const origin = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(",") : false;
  app.register(Cors, { credentials: true, origin });

  // Inject core module
  app.register(fp(modeToModule[options.mode]), { name: "core" });

  // routes...
  app.register(auth, { prefix: "auth" });

  return app;
};

export default build;
