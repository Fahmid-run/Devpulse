import { pool } from "../../db/db";
import type { IssuesPayload } from "../../types";

const createIssueDb = async (payload: IssuesPayload, reporterId:number) => {
  const { title, description, type } = payload;
  const result = await pool.query(
    `
    INSERT INTO issues (title, description, type,reporter_id) 
      VALUES ($1, $2, $3,$4) 
      RETURNING *;
    `,
    [title, description, type, reporterId],
  );

  return result;
};


const issueServices = {
  createIssueDb,
};
export default issueServices;