import express, { type Application, type Request, type Response } from 'express';
import { authRoute } from './modules/Auth/auth.route';
import { issuesRoute } from './modules/Issues/issues.route';
import { globalErrorHandler } from './utils/globalErrorHandler';
const app: Application = express();

//middlewares

app.use(express.json());


//endpoints

app.get('/', (req:Request, res:Response) => {
  res.end('root route');
});


app.use('/api/auth', authRoute);
app.use("/api/issues", issuesRoute)

//global error handeler

app.use(globalErrorHandler)

export default app;
