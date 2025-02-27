import pg from "pg";
import dotenv from "dotenv";
import { logMessage } from "../logger.js";
import fs from "fs"; 

dotenv.config();

// const db = new pg.Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false,
//         ca: fs.readFileSync("./ca.pem", "utf8"),
//     },
// });

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    // ssl: false
    ssl: {
        rejectUnauthorized: false,
    },
});

export default db;


db.connect()
    .then(() => logMessage("info", "database", "Connected to Aiven PostgreSQL"))
    .catch((err) => {
        logMessage("error", "database", `Database connection error: ${err.message}`);
        process.exit(1);
    });

db.on("error", (err) => {
    logMessage("error", "database", `Unexpected error on idle client: ${err.message}`);
    process.exit(-1);
});

// Database query function
export const query = (text, params) => {
    return db.query(text, params).catch((err) => {
        logMessage("error", "databaseQuery", `Query error: ${err.message}`);
        throw err;
    });
};
