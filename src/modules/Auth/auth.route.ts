import { Router, type Request, type Response } from 'express';
import authController from './auth.controller';

const route: Router = Router();

route.post('/signup', authController.registerUser);
route.post('/login', authController.loginUser);


export const authRoute = route;