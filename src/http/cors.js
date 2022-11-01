export default async function cors(fastify, options) {
  fastify.addHook("onRequest", (req, reply, next) => {
    reply.header("Access-Control-Allow-Credentials", "true");
    next();
  });
}
