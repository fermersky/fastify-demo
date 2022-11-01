import build from "./app.js";
import settings from "./settings.js";

const start = async () => {
  const app = await build(settings.dotenv);

  try {
    app.listen({ port: process.env.PORT });
  } catch (err) {
    app.log.error(err);

    process.exit(1);
  }
};

start();
