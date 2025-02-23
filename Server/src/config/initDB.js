// initDB.js
import { query } from './db.js';
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
    await query(createMembershipTable);
    await query(createCollectionTable);
    await query(createCategoryTable);
    await query(createBookTable);
    await query(createIssuanceTable);
    await query(createUsersTable);
    console.log('Database initialized successfully.');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
};
