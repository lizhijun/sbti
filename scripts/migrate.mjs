import { existsSync, readFileSync } from "node:fs";
import { loadEnvFile } from "node:process";
import { neon } from "@neondatabase/serverless";

if (existsSync(".env.local")) loadEnvFile(".env.local");
if (!process.env.DATABASE_URL) throw new Error("Missing DATABASE_URL");

const sql = neon(process.env.DATABASE_URL);
const statements = readFileSync(new URL("../db/migrations/001_create_rankings.sql", import.meta.url), "utf8")
  .split(";")
  .map((statement) => statement.trim())
  .filter((statement) => statement && statement !== "BEGIN" && statement !== "COMMIT");

await sql.transaction(statements.map((statement) => sql.query(statement)));
console.log("Neon database migration complete.");
