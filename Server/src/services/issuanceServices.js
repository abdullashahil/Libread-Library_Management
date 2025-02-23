import { query } from "../config/db.js";

// Get all issuances
export const getIssuances = async () => {
    const { rows } = await query("SELECT * FROM issuance");
    return rows;
};

// Get issuance by id
export const getIssuanceById = async (issuanceId) => {
  const { rows } = await query("SELECT * FROM issuance WHERE issuance_id = $1", [issuanceId]);
  return rows[0];
};

// Get filtered issuance by date and status
export const getFilteredIssuances = async (status, date) => {

  // Start with a query that joins issuance, member, and book
  let baseQuery = `
    SELECT 
      i.issuance_id,
      i.book_id,
      i.issuance_member,
      i.issuance_date,
      i.issued_by,
      i.target_return_date,
      i.issuance_status,
      m.mem_name AS member_name,
      b.book_name AS book_name
    FROM issuance i
    JOIN member m ON i.issuance_member = m.mem_id
    JOIN book b ON i.book_id = b.book_id
    WHERE 1=1
  `;

  const params = [];

  // Filter by status if provided
  if (status) {
    params.push(status);
    baseQuery += ` AND i.issuance_status ILIKE $${params.length}`;
  }

  // Filter by date if provided
  // Using to_char(...) so we can compare YYYY-MM-DD against a string date
  if (date) {
    params.push(date);
    baseQuery += ` AND to_char(i.target_return_date, 'YYYY-MM-DD') = $${params.length}`;
  }

  const { rows } = await query(baseQuery, params);
  return rows;
};

// Create a new issuance
export const createIssuance = async (issuanceData) => {
    const { book_id, issuance_date, issuance_member, issued_by, target_return_date, issuance_status } = issuanceData;

    const insertQuery = `
      INSERT INTO issuance (book_id, issuance_date, issuance_member, issued_by, target_return_date, issuance_status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [book_id, issuance_date, issuance_member, issued_by, target_return_date, issuance_status];
    const { rows } = await query(insertQuery, values);
    return rows[0];
};

// Update an issuance record
export const updateIssuance = async (issuanceData, issuanceId) => {
    const { book_id, issuance_date, issuance_member, issued_by, target_return_date, issuance_status } = issuanceData;

    const updateQuery = `
      UPDATE issuance
      SET book_id = $1,
          issuance_date = $2,
          issuance_member = $3,
          issued_by = $4,
          target_return_date = $5,
          issuance_status = $6
      WHERE issuance_id = $7
      RETURNING *;
    `;
    const values = [book_id, issuance_date, issuance_member, issued_by, target_return_date, issuance_status, issuanceId];
    const { rows } = await query(updateQuery, values);
    return rows[0]; // updated record
};

// Delete an issuance record
export const deleteIssuance = async (issuanceId) => {
    const deleteQuery = `
      DELETE FROM issuance
      WHERE issuance_id = $1
      RETURNING *;
    `;
    const { rowCount } = await query(deleteQuery, [issuanceId]);
    return rowCount > 0; // returns true if a record was deleted
};

// Search issuances by issuance_status or issued_by (case-insensitive)
export const searchIssuance = async (searchTerm) => {
  const searchQuery = `
    SELECT *
    FROM issuance
    WHERE issuance_status ILIKE $1
       OR issued_by ILIKE $1
  `;
  const values = [`%${searchTerm}%`];
  const { rows } = await query(searchQuery, values);
  return rows;
};
