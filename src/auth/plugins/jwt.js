import jsonwebtoken from "jsonwebtoken";

export default async function jwt(fastify, options) {
  const sign = (payload, options) => jsonwebtoken.sign(payload, fastify.config.JWT_SECRET, options);
  const verify = (token, options) => jsonwebtoken.verify(token, fastify.config.JWT_SECRET, options);

  fastify.decorate("jwt", {
    sign,
    verify,
    decode: jsonwebtoken.decode,
  });
}
