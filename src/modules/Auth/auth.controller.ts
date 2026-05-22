import type { Request, Response } from 'express';
import authServices from './auth.service';
import sendResponse from '../../utils/sendResponse';
import { getErrorMessage } from '../../utils/getError';
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes';

const signUpUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.createUserDb(req.body);
    sendResponse.sendMsgResponse(res, {
      success: true,
      status: StatusCodes.CREATED,
      message: 'User registered successfully',
      data: result.rows[0],
    });
  } catch (error: unknown) {
    sendResponse.sendErrorResponse(res, {
      success: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: getErrorMessage(error),
      errors: error,
    });
  }
};
const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.loginUserDb(req.body);
    const { refreshToken } = result;

    res.cookie('refresh_token', refreshToken, {
      secure: false, // In production => true
      httpOnly: true,
      sameSite: 'lax',
    });

    sendResponse.sendMsgResponse(res, {
      success: true,
      status: StatusCodes.OK,
      message: 'login success',
      data: {
        refreshToken,
      },
    });
  } catch (error: unknown) {
    sendResponse.sendErrorResponse(res, {
      success: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: getErrorMessage(error),
      errors: error,
    });
  }
};

const authController = {
  signUpUser,
  loginUser,
};
export default authController;
