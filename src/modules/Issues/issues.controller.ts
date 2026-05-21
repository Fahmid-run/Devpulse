import type { Request, Response } from 'express';
import issueServices from './issue.service';
import sendResponse from '../../utils/sendResponse';
import { getErrorMessage } from '../../utils/getError';

const createIssue = async (req: Request, res: Response) => {
  try {
    const reporterId = req.user.id;
    const result = await issueServices.createIssueDb(req.body, reporterId);
    sendResponse(res, {
      success: true,
      status: 201,
      message: 'Issue Created successfully',
      data: result.rows[0],
    });
  } catch (error:unknown) {
    sendResponse(res, {
      success: false,
      status: 500,
      message: getErrorMessage(error),
      data: {},
    });
  }
};
export const issueController = {
  createIssue,
};
