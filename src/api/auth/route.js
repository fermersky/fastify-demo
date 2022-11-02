import fp from "fastify-plugin";

import jwt from "./plugins/jwt.js";

export default async function auth(fastify, options) {
  fastify.register(fp(jwt), { secret: fastify.config.JWT_SECRET });

  const opts = {
    schema: {
      body: {
        type: "object",
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            token: { type: "string" },
          },
        },
      },
    },
  };
  fastify.post("/login", opts, async (request, response) => {
    const { email, password } = request.body;

    const driver = await fastify.driver_service.getOneByEmail(email);

    if (!driver) {
      response.status(401).send({ detail: "email or password is wrong" });
    }
    const correctPassword = await fastify.crypto.compare(password, driver.password);

    if (!correctPassword) {
      response.status(401).send({ detail: "email or password is wrong" });
    }

    const token = await fastify.jwt.sign({ email });

    return { token };
  });
}
