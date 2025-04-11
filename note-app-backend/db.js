const { Pool } = require("pg");
require("dotenv").config();

// Create a connection pool for PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER, // e.g., 'postgres'
  host: process.env.DB_HOST, // e.g., 'localhost'
  database: process.env.DB_NAME, // e.g., 'noteapp'
  password: process.env.DB_PASSWORD, // your database password
  port: 5432, // default PostgreSQL port
});

module.exports = pool;

const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to the database!");
    client.release();
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
};

testConnection();
