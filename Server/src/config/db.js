import pg from "pg";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync("./ca.pem").toString(),
    }
});

db.connect()
    .then(() => console.log("✅ Connected to Aiven PostgreSQL"))
    .catch((err) => {
        console.error("❌ Database connection error:", err.stack);
        process.exit(1);
    });

db.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
});

export const query = (text, params) => db.query(text, params); 


