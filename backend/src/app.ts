import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend vite
    credentials: true,
  })
);

app.get("/", (_, res) => {
  res.json({ message: "QuestBoard API up 🚀" });
});

export default app;
