import { pool } from '../../db/db';
import type { IssuesPayload } from '../../types';
import { getUserById, updateDataByid } from '../../utils/queries';

const createIssueDb = async (payload: IssuesPayload, reporterId: number) => {
  const { title, description, type } = payload;
  const result = await pool.query(
    `
    INSERT INTO issues(title, description, type,reporter_id) 
      VALUES ($1, $2, $3,$4) 
      RETURNING *;
    `,
    [title, description, type, reporterId],
  );

  return result;
};

const getSingleIssueFromDb = async (id: unknown) => {
  const result = await pool.query(`SELECT * FROM issues WHERE id =$1`,[id]);
  return result;
};

const updateissuesDb = async (payload, issueID: number) => {
  const { title, description, type } = payload;
  const result = await pool.query(
    `
      UPDATE issues SET
      title=$1,
      description=$2,
      type=$3
      WHERE id=$4
      RETURNING *
    `,
    [title, description, type, issueID],
  );

  return result;
}
const issueServices = {
  createIssueDb,
  getSingleIssueFromDb,
  updateissuesDb,
};
export default issueServices;
