import { Router, type Request, type Response } from 'express';
import { issueController } from './issues.controller';
import auth from '../../middleware/auth.middleware';


const route: Router = Router();

route.post('/',auth.authUserRole("contributor","maintainer"),issueController.createIssue);

export const issuesRoute = route;
