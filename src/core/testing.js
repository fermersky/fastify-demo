class PostgresClientMock {
  async query(query) {
    console.log("GO TO THE POSTGRES MOCK DATABASE SO WON'T GO TO THE REAL DB");
  }
}

export default async function (fastify, options) {
  fastify.decorate("pg", new PostgresClientMock());
}
