import { query } from './db.js';
import { logMessage } from '../logger.js';  // Import the logger
import {
    createMemberTable,
    createMembershipTable,
    createCollectionTable,
    createCategoryTable,
    createBookTable,
    createIssuanceTable,
    createUsersTable
} from '../models/index.js';

export default async function initializeDatabase() {
    try {
        await query(createMemberTable);
        logMessage("info", "initDB", "Member table initialized.");

        await query(createMembershipTable);
        logMessage("info", "initDB", "Membership table initialized.");

        await query(createCollectionTable);
        logMessage("info", "initDB", "Collection table initialized.");

        await query(createCategoryTable);
        logMessage("info", "initDB", "Category table initialized.");

        await query(createBookTable);
        logMessage("info", "initDB", "Book table initialized.");

        await query(createIssuanceTable);
        logMessage("info", "initDB", "Issuance table initialized.");

        await query(createUsersTable);
        logMessage("info", "initDB", "Users table initialized.");

        logMessage("info", "initDB", "Database initialized successfully.");
    } catch (err) {
        logMessage("error", "initDB", `Error initializing database: ${err.message}`);
        process.exit(1);
    }
};
