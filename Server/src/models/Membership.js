// Membership table
export const createMembershipTable = `
  CREATE TABLE IF NOT EXISTS membership (
    membership_id SERIAL PRIMARY KEY,
    member_id INTEGER,
    status VARCHAR,
    FOREIGN KEY (member_id) REFERENCES member(mem_id)
  );
`;