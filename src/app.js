import Fastify from "fastify";
import fp from "fastify-plugin";
import Env from "@fastify/env";
import auth from "./auth/auth.js";

import testing_core from "./core/testing.js";
import default_core from "./core/default.js";

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
    testing: testing_core,
    default: default_core,
  };

  // Initialize fastify.settings from the .env file
  app.register(Env, options.env);

  // Inject core module
  app.register(fp(modeToModule[options.mode]), { name: "core" });

  // routes...
  app.register(auth, { prefix: "auth" });

  return app;
};

export default build;
