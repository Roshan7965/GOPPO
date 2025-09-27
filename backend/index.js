import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials:true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  connectdb();
  console.log("server started");
});
