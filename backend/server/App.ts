import express from "express";
import loaders from "./loaders";
import "reflect-metadata";

export async function startServer() {
  const app = express();
  await loaders({ expressApp:app });
  const port = 5000;

  app.listen(port, (err?: unknown) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(port);
  });
}

startServer()