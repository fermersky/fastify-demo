import app from "./app.js";

const start = async () => {
  try {
    await app.listen({ port: 5000 });
  } catch (err) {
    app.log.error(err);

    process.exit(1);
  }
};

start();
