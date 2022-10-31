import Fastify from "fastify";
import fp from "fastify-plugin";

import auth from "./routes/auth.js";
import jwt from "./plugins/jwt.js";

const app = Fastify({
  logger: true,
});

app.register(fp(jwt));
app.register(auth, { prefix: "/auth" });

app.get("/", async (request, response) => {
  return { status: "ok" };
});

export default app;
