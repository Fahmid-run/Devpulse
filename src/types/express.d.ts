import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      // Replace 'any' with your actual User type/interface if you have one
      user?: any;
    }
  }
}
