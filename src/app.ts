import express from "express";
import connectDB from "./config/db";
import todoRoutes from "./routes/todo";
import config from "./config";

const app = express();

app.use(express.json());
app.use("/todos", todoRoutes);
connectDB();

export default app;
