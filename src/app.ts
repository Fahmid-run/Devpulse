import express, { type Application, type Request, type Response } from 'express';
import { authRoute } from './modules/Auth/auth.route';
import { issuesRoute } from './modules/Issues/issues.route';
import { globalErrorHandler } from './utils/globalErrorHandler';
import cookieParser from 'cookie-parser';
const app: Application = express();
import cors from "cors"

//middlewares

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

const corsoptions = {
  origin: 'http://localhost:3000',
};
app.use(cors(corsoptions));


//endpoints

app.get('/', (req:Request, res:Response) => {
  res.end('root route');
});


app.use('/api/auth', authRoute);
app.use("/api/issues", issuesRoute)

//global error handeler

app.use(globalErrorHandler)



// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
