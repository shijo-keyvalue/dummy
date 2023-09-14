import "./config"; // initiate dot env configs, etc.
import { createConnection } from "typeorm";
import App from "./app";
import rdbmsConfig from "./config/rdbms"; // config file for typeorm
import controllers from "./controller";
import { validateEnv } from "./util/validationHelper";

validateEnv();

process.on("uncaughtException", (e) => {
  process.exit(1);
});
process.on("unhandledRejection", (e) => {
  process.exit(1);
});
(async () => {
  try {
    await createConnection(rdbmsConfig);
  } catch (error) {
    process.exit(1);
  }
  const app = new App(controllers);
  app.listen();
})();
