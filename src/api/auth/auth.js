import jwt from "./plugins/jwt.js";

import fp from "fastify-plugin";

export default async function (fastify, options) {
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
    console.log({ email, password });

    await fastify.pg.query("select * from users");

    const token = fastify.jwt.sign({});

    return { token };
  });
}
