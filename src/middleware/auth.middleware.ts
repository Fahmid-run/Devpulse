import type { NextFunction, Request, Response } from 'express';
import type { UserRole } from '../types';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import configuration from '../config';
import { pool } from '../db/db';
import sendResponse from '../utils/sendResponse';
const authUserRole = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        sendResponse(res, {
          success: false,
          status: 401,
          message: 'unauthorized access!!',
        });
      }

      const decoded = jwt.verify(
        token as string,
        configuration.JWT_REFRESH_SECRET as string,
      ) as JwtPayload;

      const getUserData = pool.query(
        `
      SELECT * FROM users WHERE id=$1
      `,
        [decoded.id],
      );

      const user = (await getUserData).rows[0];

      if (user.length === 0) {
        sendResponse(res, {
          success: false,
          status: 401,
          message: 'unauthorized',
          data: {},
        });
      }

      if (roles.length && !roles.includes(decoded.role)) {
        sendResponse(res, {
          success: false,
          status: 403,
          message: 'forbidden',
        });
      }

      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
};

const auth = {
  authUserRole,
};
export default auth;
