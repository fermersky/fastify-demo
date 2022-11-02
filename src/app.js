import Cors from "@fastify/cors";
import Env from "@fastify/env";
import Fastify from "fastify";
import fp from "fastify-plugin";

import auth from "./api/auth/route.js";
import defaultCore from "./core/default.js";
import testingCore from "./core/testing.js";
import { AppSettings } from "./settings.js";
import shared from "./shared/shared.js";

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

  // Initialize fastify.config from the .env file
  app.register(Env, options.env);

  // CORS
  const origin = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(",") : false;
  app.register(Cors, { credentials: true, origin });

  // Inject core module
  app.register(fp(modeToModule[options.mode]), { name: "core" });

  // Inject shared module
  app.register(fp(shared));

  // routes...
  app.register(auth, { prefix: "auth" });

  return app;
};

export default build;
