import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import eventsRoutes from "./routes/events.routes.js";

mongoose.connect("mongodb://127.0.0.1:27017/petu");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventsRoutes);

app.listen(3000, () => console.log("Backend running on 3000"));
