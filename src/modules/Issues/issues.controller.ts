import type { Request, Response } from 'express';
import issueServices from './issue.service';
import sendResponse from '../../utils/sendResponse';

const createIssue = async (req: Request, res: Response) => {
  try {
    const result = await issueServices.createIssueDb(req.body);
    sendResponse(res, {
      success: true,
      status: 200,
      message: 'Issue Created successfully',
      data: result.rows[0],
    });
  } catch (error) {
    sendResponse(res, {
      success: false,
      status: 500,
      message: error.message,
      data: {},
    });
  }
};
export const issueController = {
  createIssue,
};
