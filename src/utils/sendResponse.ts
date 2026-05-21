import type { Response } from "express";

const sendResponse = (
  res: Response,
  data: {
    success: boolean;
    status: number;
    message: string;
    data?: object;
  },
) => {
  return res.status(data.status).json({
    success: data.success,
    status: data.status,
    message: data.message,
    data: data.data,
  });
};



export default sendResponse;