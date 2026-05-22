import type { Request, Response } from 'express';
import authServices from './auth.service';
import sendResponse from '../../utils/sendResponse';
import { getErrorMessage } from '../../utils/getError';

const signUpUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.createUserDb(req.body);
    sendResponse.sendMsgResponse(res, {
      success: true,
      status: 201,
      message: 'User registered successfully',
      data: result.rows[0],
    });
  } catch (error: unknown) {
    sendResponse.sendErrorResponse(res, {
      success: false,
      status: 500,
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
      status: 200,
      message: 'login success',
      data: {
        refreshToken,
      },
    });
  } catch (error:unknown) {
    if (error instanceof Error) {
      sendResponse.sendErrorResponse(res, {
        success: false,
        status: 500,
        message: getErrorMessage(error),
        errors: error,
      });
    }

  
      sendResponse.sendErrorResponse(res, {
        success: false,
        status: 500,
        message: "internal server error"
      });
    
  }

};

const authController = {
  signUpUser,
  loginUser,
};
export default authController;
