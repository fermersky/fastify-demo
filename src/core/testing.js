import { PostgresClientMock } from "./services/pg_client.js";

export default async function testingModule(fastify, options) {
  fastify.decorate("pg", new PostgresClientMock());
}
