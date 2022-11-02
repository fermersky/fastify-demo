export class DriverService {
  constructor(pg) {
    this.pg = pg;
  }

  async getOneByEmail(email) {
    const result = await this.pg.query({ text: "SELECT * FROM drivers WHERE email = $1", values: [email] });

    if (!result.rows) {
      return null;
    }

    return result.rows[0];
  }
}

export class DriverServiceMock {
  async getOneByEmail(email) {
    return {
      email,
      password: "$2b$12$4Bw0eu.nAy/6eBvzOZmXdu7FNP7mLjnvwRrjNS0RjFQXzfxFdyEtK",
    };
  }
}

export default DriverService;
