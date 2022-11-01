import build from "./app.js";
import { dotenv } from "./env.js";

const start = async () => {
  const app = await build(dotenv);

  try {
    app.listen({ port: process.env.PORT });
  } catch (err) {
    app.log.error(err);

    process.exit(1);
  }
};

start();
