import { Router, type Request, type Response } from 'express';
import { issueController } from './issues.controller';
import auth from '../../middleware/auth.middleware';
import authController from '../Auth/auth.controller';


const route: Router = Router();


//create issues
route.post('/',auth.authToken(),auth.authUserRole("contributor","maintainer"),issueController.createIssue);

//get single issues
route.get('/:id',issueController.getSingleIssue);


//update issues
route.patch('/:id',auth.authToken(),auth.authUserRole("contributor","maintainer"), issueController.updateIssue);

export const issuesRoute = route;
