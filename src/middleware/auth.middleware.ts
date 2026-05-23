import type { NextFunction, Request, Response } from 'express';
import type { UserRole } from '../types';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import configuration from '../config';
import { pool } from '../db/db';
import sendResponse from '../utils/sendResponse';
import { getUserById } from '../utils/queries';



const authToken = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
       if (!token) {
         return sendResponse.sendErrorResponse(res, {
           success: false,
           status: 401,
           message: 'unauthorized access!!',
         });
       }
      
        const decoded = jwt.verify(
          token as string,
          configuration.JWT_SECRET as string,
        ) as JwtPayload;


      req.user = decoded;
      next()
      
    } catch (error) {
     
      next(error)
      
    }
  }
}



const authUserRole = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {

     if (!req.user) {
       return sendResponse.sendErrorResponse(res, {
         success: false,
         status: 401,
         message: 'unauthorized access!!',
       });
     }
     
      const getUserData = pool.query(getUserById, [req.user.id]);

      const user = (await getUserData).rows[0];

      if (!user) {
        return sendResponse.sendErrorResponse(res, {
          success: false,
          status: 401,
          message: 'unauthorized'
        });
      }

      if (roles.length && !roles.includes(req.user.role)) {
        return sendResponse.sendErrorResponse(res, {
          success: false,
          status: 403,
          message: 'forbidden',
        });
      }

      req.user = user;

      next();
    } catch (error:unknown) {
      next(error);
    }
  };
};

const auth = {
  authUserRole,
  authToken,
};
export default auth;
