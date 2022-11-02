import { Validator } from "jsonschema";
import pg from "pg";

export class PostgresClient {
  /**
   *
   * @param {PGClientConfig} config
   *
   * @typedef PGClientConfig
   * @type {object}
   * @property {string} host
   * @property {string} port
   * @property {string} user
   * @property {string} password
   * @property {string} database
   */
  constructor(config) {
    this.#validate(config);
    const { host, port, user, password, database } = config;

    this.pg = new pg.Pool({
      host,
      port,
      user,
      password,
      database,
    });
  }

  async query(query) {
    return this.pg.query(query);
  }

  #validate(config) {
    const v = new Validator();
    const schema = {
      type: "object",
      required: ["host", "port", "user", "password", "database"],
    };

    v.validate(config, schema, { throwFirst: true });
  }
}

export class PostgresClientMock {
  async query(query) {
    return { rows: [] };
  }
}
