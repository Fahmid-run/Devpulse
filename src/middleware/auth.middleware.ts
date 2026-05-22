import type { NextFunction, Request, Response } from 'express';
import type { UserRole } from '../types';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import configuration from '../config';
import { pool } from '../db/db';
import sendResponse from '../utils/sendResponse';



const authToken = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
       if (!token) {
         return sendResponse(res, {
           success: false,
           status: 401,
           message: 'unauthorized access!!',
         });
       }
      
        const decoded = jwt.verify(
          token as string,
          configuration.JWT_REFRESH_SECRET as string,
        ) as JwtPayload;


      req.user = decoded;
      next()
      
    } catch (error) {
      return sendResponse(res, {
        success: false,
        status: 401,
        message: 'invalid or expired token!',
      });
    }
  }
}



const authUserRole = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {

     if (!req.user) {
       return sendResponse(res, {
         success: false,
         status: 401,
         message: 'unauthorized access!!',
       });
     }
     
      const getUserData = pool.query(
        `
      SELECT * FROM users WHERE id=$1
      `,
        [req.user.id],
      );

      const user = (await getUserData).rows[0];

      if (!user) {
        return sendResponse(res, {
          success: false,
          status: 401,
          message: 'unauthorized',
          data: {},
        });
      }

      if (roles.length && !roles.includes(req.user.role)) {
        return sendResponse(res, {
          success: false,
          status: 403,
          message: 'forbidden',
        });
      }

      req.user = user;

      next();
    } catch (error) {
      next(error);
    }
  };
};

const auth = {
  authUserRole,
  authToken,
};
export default auth;
