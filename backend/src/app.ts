import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import indexRoutes from "./routes/index.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// app.use("/api", indexRoutes);
app.use("/api/auth", authRoutes);

export default app;
