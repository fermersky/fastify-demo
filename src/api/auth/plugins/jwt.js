import jsonwebtoken from "jsonwebtoken";
import assert from "node:assert";

function validateJWTSecret(secret) {
  assert.ok(secret, "secret is undefined");
  assert.ok(secret.length > 10, "secret must have at least 10 symbols");
}

/**
 * JWT utils
 *
 * @param {FastifyInstance} fastify
 * @param {JWTPluginOptions} options

 * @typedef JWTPluginOptions
 * @type {object}
 * @property {string} secret
 */
export default async function jwt(fastify, options) {
  const { secret } = options;

  validateJWTSecret(secret);

  const sign = (payload, options) => jsonwebtoken.sign(payload, secret, options);
  const verify = (token, options) => jsonwebtoken.verify(token, secret, options);

  fastify.decorate("jwt", {
    sign,
    verify,
    decode: jsonwebtoken.decode,
  });
}
