import { Router, type Request, type Response } from 'express';
import { issueController } from './issues.controller';


const route: Router = Router();

route.post('/',issueController.createIssue);

export const issuesRoute = route;
