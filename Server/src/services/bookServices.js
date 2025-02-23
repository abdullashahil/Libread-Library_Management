import { query } from "../config/db.js";

export const getBooks = async () => {
    const { rows } = await query("SELECT * FROM book");
    return rows;
};

export const getBookById = async (bookId) => {
  const { rows } = await query("SELECT * FROM book WHERE book_id = $1", [bookId]);
  return rows[0];
};

export const addBook = async (bookData) => {
    const { book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher } = bookData;

    // Insert the new book record
    const insertQuery = `
    INSERT INTO book (book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
    const values = [book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher];
    const { rows } = await query(insertQuery, values);

    // Return the newly inserted book record
    return rows[0];
};

export const updateBook = async (bookData, bookId) => {
    const { book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher } = bookData;

    const updateQuery = `
      UPDATE book
      SET book_name = $1,
          book_cat_id = $2,
          book_collection_id = $3,
          book_launch_date = $4,
          book_publisher = $5
      WHERE book_id = $6
      RETURNING *;
    `;

    const values = [book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher, bookId];
    const { rows } = await query(updateQuery, values);

    return rows[0]; // updated record
};

export const deleteBook = async (bookId) => {
    const deleteQuery = `
      DELETE FROM book
      WHERE book_id = $1
      RETURNING *;
    `;

    const { rowCount } = await query(deleteQuery, [bookId]);
    return rowCount > 0; // returns true if a record was deleted
};

export const searchBook = async (searchTerm) => {
  // Search in book_name and optionally book_publisher for a case-insensitive match
  const searchQuery = `
    SELECT *
    FROM book
    WHERE book_name ILIKE $1
       OR book_publisher ILIKE $1
  `;

  const values = [`%${searchTerm}%`];
  const { rows } = await query(searchQuery, values);

  return rows;
};
