import { pool } from '../../db/db';
import type { IssuesPayload } from '../../types';
import {
  deleteIssueByid,
  getAllIssueDetails,
  getIssueDetailsById,
  updateDataByid,
} from '../../utils/queries';

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
  const result = await pool.query(getIssueDetailsById, [id]);
  return result;
};
const getAllIssueFromDb = async () => {
  const result = await pool.query(getAllIssueDetails);
  return result;
};

const updateissuesDb = async (payload: IssuesPayload, issueID: string) => {
  const { title, description, type, status } = payload;
  const result = await pool.query(updateDataByid, [
    title,
    description,
    type,
    status,
    issueID,
  ]);

  return result;
};

const deleteIssuesDB = async (id: string) => {
  const result = await pool.query(deleteIssueByid, [id]);

  return result;
};
const issueServices = {
  createIssueDb,
  getSingleIssueFromDb,
  getAllIssueFromDb,
  updateissuesDb,
  deleteIssuesDB,
};
export default issueServices;
