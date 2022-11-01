import Fastify from "fastify";
import fp from "fastify-plugin";
import Env from "@fastify/env";
import auth from "./auth/auth.js";

const build = async (options) => {
  const app = Fastify({
    logger: options.logger,
  });

  app.register(Env, options.env);

  const core = await import(`./core/${options.mode}.js`);

  app.register(fp(core), { name: "core" });

  app.register(auth, { prefix: "auth" });

  return app;
};

export default build;
