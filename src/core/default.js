class PostgresClient {
  async query(query) {
    console.log("GO TO THE POSTGRES");
  }
}

export default async function (fastify, options) {
  fastify.decorate("pg", new PostgresClient());
}
