import { pool } from "../../db/db";
import type { IssuesPayload } from "../../types";

const createIssueDb = async (payload:IssuesPayload) => {
  const { title, description, type }=payload;
  const result = await pool.query(
    `
    INSERT INTO issues (title, description, type) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `,
    [title, description, type],
  );

  return result;
}


const issueServices = {
  createIssueDb,
};
export default issueServices;