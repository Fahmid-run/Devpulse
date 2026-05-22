import { Router, type Request, type Response } from 'express';
import { issueController } from './issues.controller';
import auth from '../../middleware/auth.middleware';

const route: Router = Router();

//create issues
route.post(
  '/',
  auth.authToken(),
  auth.authUserRole('contributor', 'maintainer'),
  issueController.createIssue,
);

//get single issues
route.get('/:id', issueController.getSingleIssue);

//get all issues
route.get('/', issueController.getAllIssues);


//update issues
route.patch(
  '/:id',
  auth.authToken(),
  auth.authUserRole('contributor', 'maintainer'),
  issueController.updateIssue,
);

//delete issues
route.delete('/:id', auth.authToken(), auth.authUserRole('maintainer'),issueController.deleteIssue);

export const issuesRoute = route;
