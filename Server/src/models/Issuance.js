// Issuance table
export const createIssuanceTable = `
  CREATE TABLE IF NOT EXISTS issuance (
    issuance_id SERIAL PRIMARY KEY,
    book_id INTEGER,
    issuance_date TIMESTAMP,
    issuance_member INTEGER,
    issued_by VARCHAR,
    target_return_date TIMESTAMP,
    issuance_status VARCHAR,
    FOREIGN KEY (book_id) REFERENCES book(book_id),
    FOREIGN KEY (issuance_member) REFERENCES member(mem_id)
  );
`;