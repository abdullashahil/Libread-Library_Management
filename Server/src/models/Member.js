// Member table
export const createMemberTable = `
  CREATE TABLE IF NOT EXISTS member (
    mem_id SERIAL PRIMARY KEY,
    mem_name VARCHAR,
    mem_phone VARCHAR,
    mem_email VARCHAR
  );
`;