import jsonwebtoken from "jsonwebtoken";

async function jwt(fastify, options) {
  fastify.decorate("jwt", jsonwebtoken);
}

export default jwt;
