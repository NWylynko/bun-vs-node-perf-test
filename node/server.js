import { readFile } from "fs/promises";
import http from "http";
import Database from "better-sqlite3";

const db = new Database("../test.db");

http
  .createServer(async function (req, res) {
    try {
      let dataPromises = []
      for (let i = 0; i < 10; i++) {
        dataPromises.push(parseFile);
      }
      const data = Promise.all(dataPromises);

      let rowsPromises = [];
      for (let i = 0; i < 10; i++) {
        rowsPromises.push(readDatabase)
      }
      const rows = Promise.all(rowsPromises);

      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(JSON.stringify({ data, rows }));
    } catch (e) {
      res.statusCode = 500;
      res.end(JSON.stringify(e));
    }
  })
  .listen(4000);

const parseFile = async () => {
  data = JSON.parse(
    await readFile("../test.json", { encoding: "utf-8" })
  );
  return data;
}

const readDatabase = () => {
  return db.prepare("SELECT * from test").get();
}