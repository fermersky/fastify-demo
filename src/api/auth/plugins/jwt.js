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

  const sign = (payload, opts) => jsonwebtoken.sign(payload, secret, opts);
  const verify = (token, opts) => jsonwebtoken.verify(token, secret, opts);

  fastify.decorate("jwt", {
    sign,
    verify,
    decode: jsonwebtoken.decode,
  });
}
