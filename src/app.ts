import bodyParser from "body-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import router from "./app/routes";
import GlobalErrorHandel from "./app/middlewares/globalErrorHandel";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

app.use(express.json());
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

//application routes
app.use("/api" , router);

app.get("/", (req: Request, res: Response) => {
const result = "Hello Car Wash Center !!!"
res.send(result);
});

// Global error handler
app.use(GlobalErrorHandel);

//Not Found
app.use(notFound)


export default app;