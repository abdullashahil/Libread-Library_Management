import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Log directory setup
const logDirectory = process.env.LOG_DIR || path.join(__dirname, "..", "logs");
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

const uppercaseLevel = winston.format((info) => {
    info.level = info.level.toUpperCase(); // Convert level to uppercase
    return info;
});

// Log format
const logFormat = winston.format.printf(({ level, message, timestamp, functionName }) => {
    return `[${timestamp}] [${level}] [${functionName}] - ${message}`;
});

// Log transport with rotation
const rotateFileTransport = new DailyRotateFile({
    filename: path.join(logDirectory, "app-%DATE%.log"), //(e.g., app-2025-02-26.log)
    datePattern: "YYYY-MM-DD",
    maxSize: "10m",
    maxFiles: "14d",
    format: winston.format.combine(
        uppercaseLevel(), // Capitalize log levels
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.json()
    ),
});

// Console format (with colors)
const consoleFormat = winston.format.combine(
    uppercaseLevel(),
    winston.format.colorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
);

// Create Winston logger
const logger = winston.createLogger({
    level: "info",
    transports: [
        new winston.transports.Console({ format: consoleFormat }),
        rotateFileTransport
    ],
});

// Function to log messages
const logMessage = (level, functionName, message) => {
    logger.log({ level, functionName, message });
};


export { logger, logMessage };
