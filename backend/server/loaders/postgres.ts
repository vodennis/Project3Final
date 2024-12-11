import { Pool } from "pg";
import { Container } from "typedi";
import dotenv from "dotenv";

dotenv.config();

export default async () => {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    // Set the search path to public after connecting the pool
    await pool.query('SET search_path TO public');

    Container.set("pool", pool);

    console.log("Connected to PostgreSQL (Supabase) database successfully.");
    return pool;
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
    throw error;
  }
};
