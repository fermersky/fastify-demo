export default async function (fastify, options) {
  fastify.addHook("onRequest", function (req, reply, next) {
    reply.header("Access-Control-Allow-Credentials", "true");
    next();
  });
}
