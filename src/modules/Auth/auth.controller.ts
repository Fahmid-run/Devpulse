import type { Request, Response } from 'express';
import { pool } from '../../db/db';
import authServices from './auth.service';
import sendResponse from '../../utils/sendResponse';

const signUpUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.createUserDb(req.body);
    sendResponse(res, {
      success: true,
      status: 201,
      message: 'User Created successfully',
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      success: false,
      status: 500,
      message: error.message,
      data: {},
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

    sendResponse(res, {
      success: true,
      status: 200,
      message: 'login success',
      data: {
        refreshToken,
      },
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

const authController = {
  signUpUser,
  loginUser,
};
export default authController;
