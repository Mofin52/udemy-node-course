import { MongoClient, Database } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
import { mongoConnect } from "../sensitive.ts";

let db: Database;

export function connect() {
  const client = new MongoClient();
  client.connectWithUri(mongoConnect);
  db = client.database("todo-app");
}

export function getDb() {
  return db;
}
