import type { Request, Response } from 'express';
import issueServices from './issue.service';
import sendResponse from '../../utils/sendResponse';
import { getErrorMessage } from '../../utils/getError';

const createIssue = async (req: Request, res: Response) => {
  try {
    const reporterId = req.user.id;
    const result = await issueServices.createIssueDb(req.body, reporterId);
    return sendResponse.sendMsgResponse(res, {
      success: true,
      status: 201,
      message: 'Issue Created successfully',
      data: result.rows[0],
    });
  } catch (error: unknown) {
    return sendResponse.sendErrorResponse(res, {
      success: false,
      status: 500,
      message: getErrorMessage(error),
      errors: error,
    });
  }
};

//get single issue by id
const getSingleIssue = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await issueServices.getSingleIssueFromDb(id);
    if (!result.rows[0]) {
      return sendResponse.sendErrorResponse(res, {
        success: false,
        status: 404,
        message: 'Issue not found',
      });
    }
    return sendResponse.sendMsgResponse(res, {
      success: true,
      status: 200,
      data: result.rows[0],
    });
  } catch (error) {
    return sendResponse.sendErrorResponse(res, {
      success: false,
      status: 500,
      message: getErrorMessage(error),
      errors:error
    });
  }
};

const updateIssue = async (req: Request, res: Response) => {
  try {
    const { role, id } = req.user;
    const issueID = req.params.id;

    const issueResult = await issueServices.getSingleIssueFromDb(issueID);

    if (issueResult.rows.length === 0) {
      return sendResponse.sendErrorResponse(res, {
        success: false,
        status: 404,
        message: 'Issue Not Found',
      });
    }

    const issue = issueResult.rows[0];

    const isContributor = role === 'contributor';
    const isOpen = issue.status === 'open';
    const isOwnedIssue = issue.reporter_id === id;

    if (isContributor) {
      if (!isOwnedIssue) {
        return sendResponse.sendErrorResponse(res, {
          success: false,
          status: 403,
          message: 'You can update only your own issue',
        });
      }
      if (!isOpen) {
        return sendResponse.sendErrorResponse(res, {
          success: false,
          status: 403,
          message: 'You can update issue only when status is open ',
        });
      }
    }

    const updateIssueResult = await issueServices.updateissuesDb(
      req.body,
      issueID as string,
    );

    return sendResponse.sendMsgResponse(res, {
      success: true,
      status: 200,
      message: 'Issue updated successfully',
      data:updateIssueResult.rows[0]
    });
  } catch (error:unknown) {
    return sendResponse.sendErrorResponse(res, {
      success: false,
      status: 500,
      message: getErrorMessage(error),
      errors: error,
    });
  }
};

const deleteIssue = async (req: Request, res: Response) => {
  const issueId = req.params.id;

  try {
    const deleteResult = await issueServices.deleteIssuesDB(issueId as string);
     return sendResponse.sendMsgResponse(res, {
       success: true,
       status: 200,
       message: 'Issue deleted successfully',
     });
  } catch (error) {
     return sendResponse.sendErrorResponse(res, {
       success: false,
       status: 500,
       message: getErrorMessage(error),
     });
  }
};

export const issueController = {
  createIssue,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
