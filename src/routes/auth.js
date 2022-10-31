async function auth(fastify, options) {
  console.log(fastify.jwt);

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

    return { token: "<jwt token>" };
  });
}
export default auth;
