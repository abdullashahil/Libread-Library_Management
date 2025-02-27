import pg from "pg";
import dotenv from "dotenv";
import { logMessage } from "../logger.js";

dotenv.config();

const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('../../ca.pem').toString(),
    },
});

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
