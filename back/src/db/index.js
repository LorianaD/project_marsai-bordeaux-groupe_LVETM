import mysql from "mysql2/promise";
import { env } from "../config/env.js";

export const pool = mysql.createPool({
  host: env.db.host,
  user: env.db.user,
  password: env.db.password,
  database: env.db.database,
  port: env.db.port,
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 10000,
});

export async function testConnection() {
  console.log("fonction testConnection dans db/index.js ok");
  const [rows] = await pool.query("SELECT NOW() AS now");
  console.log("mysql ok,", rows[0].now);
}