import type { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (err: unknown, req:Request, res:Response, next:NextFunction) => {
  res.status(500).json({
    sucess: false,
    message: err.message || 'Internal Server Error',
  });
};