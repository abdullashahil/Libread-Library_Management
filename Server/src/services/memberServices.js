import { query } from "../config/db.js";

export const getMembers = async () => {
    const { rows } = await query("SELECT * FROM member");
    return rows;
};

export const getMemberById = async (memberId) => {
  const { rows } = await query("SELECT * FROM member WHERE mem_id = $1", [memberId]);
  return rows[0];
};

export const createMember = async (memberData) => {
    const { mem_name, mem_phone, mem_email } = memberData;

    // Insert the new record
    const insertQuery = `
    INSERT INTO member (mem_name, mem_phone, mem_email)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
    const values = [mem_name, mem_phone, mem_email];
    const { rows } = await query(insertQuery, values);

    // newly inserted record
    return rows[0];
};

export const updateMember = async (memberData, memberId) => {
    const { mem_name, mem_phone, mem_email } = memberData;

    const updateQuery = `
      UPDATE member
      SET mem_name = $1,
          mem_phone = $2,
          mem_email = $3
      WHERE mem_id = $4
      RETURNING *;
    `;

    const values = [mem_name, mem_phone, mem_email, memberId];
    const { rows } = await query(updateQuery, values);

    return rows[0]; // updated record
};

export const deleteMember = async (memberId) => {

    const deleteQuery = `
      DELETE FROM member
      WHERE mem_id = $1
      RETURNING *;
    `;

    const { rowCount } = await query(deleteQuery, [memberId]);

    return rowCount > 0; // deleted record
};

export const searchMember = async (searchTerm) => {
  // ILIKE for case-insensitive search in Postgres
  const searchQuery = `
    SELECT *
    FROM member
    WHERE mem_name ILIKE $1
       OR mem_email ILIKE $1
  `;

  // Wildcards: '%searchTerm%'
  const values = [`%${searchTerm}%`];

  const { rows } = await query(searchQuery, values);

  return rows;
};
