import express, { Application, Request, Response } from "express";
import routes from "./routes/routes";
import cors from 'cors';
import cookieParser from "cookie-parser"

const app: Application = express();
const PORT = Number(process.env.PORT) || 3000;

// Middlewares
app.use(cors({ origin: '*' }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes)

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: `Running`
  })
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
