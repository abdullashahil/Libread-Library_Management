// Book Table
export const createBookTable = `
  CREATE TABLE IF NOT EXISTS book (
    book_id SERIAL PRIMARY KEY,
    book_name VARCHAR,
    book_cat_id INTEGER,
    book_collection_id INTEGER,    
    book_launch_date TIMESTAMP,
    book_publisher VARCHAR,
    FOREIGN KEY (book_cat_id) REFERENCES category(cat_id),
    FOREIGN KEY (book_collection_id) REFERENCES collection(collection_id)
  );
`;