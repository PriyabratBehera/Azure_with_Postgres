// const { Pool } = require("pg");

// const pool = new Pool({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT || 5432,
//     database: process.env.DB_NAME,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     ssl: process.env.DB_SSL === "true"
//         ? { rejectUnauthorized: false }
//         : false
// });

// module.exports = pool;

const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432,
    ssl: process.env.DB_SSL === "true"
        ? { rejectUnauthorized: false }
        : false
});

async function initializeDatabase() {
    try {
        const sql = fs.readFileSync(
            path.join(__dirname, "init.sql"),
            "utf8"
        );

        await pool.query(sql);

        console.log("Database initialized successfully");

    } catch (error) {
        console.error("Database initialization failed:", error);
    }
}