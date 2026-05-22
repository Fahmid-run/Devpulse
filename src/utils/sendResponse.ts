import type { Response } from "express";

const sendMsgResponse = (
  res: Response,
  data: {
    success: boolean;
    status: number;
    message?: string;
    data?: object;
  },
) => {
  return res.status(data.status).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};


const sendErrorResponse = (
  res: Response,
  data: {
    success: boolean;
    status: number;
    message?: string;
    errors?: unknown;
  },
) => {
  return res.status(data.status).json({
    success: data.success,
    message: data.message,
    errors: data.errors ,
  });
};
const sendResponse = {
  sendMsgResponse,
  sendErrorResponse,
};
export default sendResponse;