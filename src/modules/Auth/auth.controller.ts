import type { Request, Response } from 'express';
import authServices from './auth.service';
import sendResponse from '../../utils/sendResponse';
import { getErrorMessage } from '../../utils/getError';
import { StatusCodes } from 'http-status-codes';

//register user
const registerUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.createUserDb(req.body);
    sendResponse.sendMsgResponse(res, {
      success: true,
      status: StatusCodes.CREATED,
      message: 'User registered successfully',
      data: result?.rows[0],
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

//login user
const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.loginUserDb(req.body);
    const { accessToken } = result;
    const { user } = result;
    

    res.cookie('token', accessToken, {
      secure: false, // In production => true
      httpOnly: true,
      sameSite: 'lax',
    });

    sendResponse.sendMsgResponse(res, {
      success: true,
      status: StatusCodes.OK,
      message: 'Login successfull',
      data: {
        token: accessToken,
        user
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
  registerUser,
  loginUser,
};
export default authController;
