// Category table
export const createCategoryTable = `
  CREATE TABLE IF NOT EXISTS category (
    cat_id SERIAL PRIMARY KEY,
    cat_name VARCHAR,
    sub_cat_name VARCHAR
  );
`;