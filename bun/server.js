import { Database } from "bun:sqlite";
import { readFile } from "fs/promises";

const db = new Database("../test.db");

export default {
  port: 4000,
  async fetch(request) {
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

      return new Response(JSON.stringify({ rows, data }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      });
    } catch (e) {
      return new Response(JSON.stringify(e), { status: 500 });
    }
  },
};

const parseFile = async () => {
  data = JSON.parse(
    await readFile("../test.json", { encoding: "utf-8" })
  );
  return data;
}

const readDatabase = () => {
  return db.query("SELECT * from test").all();
}