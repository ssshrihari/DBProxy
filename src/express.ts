import express from "express";
import { DbProxy } from "./db";
import { router } from "./routes";

export const app = express();
const port = 3001;

app.use(express.json());

app.use("/", router);

export function startServer(dbProxy: DbProxy) {
  app.set("dbProxy", dbProxy);
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
}
