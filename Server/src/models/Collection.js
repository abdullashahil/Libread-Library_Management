// Collection Table
export const createCollectionTable = `
  CREATE TABLE IF NOT EXISTS collection (
    collection_id SERIAL PRIMARY KEY,
    collection_name VARCHAR
  );
`;