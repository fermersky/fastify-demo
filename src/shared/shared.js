import { DriverService, DriverServiceMock } from "./db/services/driver.js";
import crypto from "./utils/crypto.js";

export default async function shared(fastify, options) {
  fastify.decorate("crypto", crypto);

  const driverService = fastify.config.ENV === "testing" ? new DriverServiceMock() : new DriverService(fastify.pg);

  fastify.decorate("driver_service", driverService);
}
