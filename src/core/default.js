import { PostgresClient } from "./services/pg_client.js";

export default async function defaultModule(fastify, options) {
  const postgresConfig = {
    host: fastify.config.POSTGRES_HOST,
    port: fastify.config.POSTGRES_PORT,
    user: fastify.config.POSTGRES_USER,
    password: fastify.config.POSTGRES_PASSWORD,
    database: fastify.config.POSTGRES_DATABASE,
  };

  fastify.decorate("pg", new PostgresClient(postgresConfig));
}
