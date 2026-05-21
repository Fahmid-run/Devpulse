import { Router, type Request, type Response } from 'express';
import authController from './auth.controller';

const route: Router = Router();

route.post("/signup", authController.signUpUser)


export const authRoute = route;