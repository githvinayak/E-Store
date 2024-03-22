import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { getBarCharts, getDashboardStats, getLineStats, getPieStats } from "../controllers/stats.js";

const app = express.Router();

app.get("/stats",adminOnly,getDashboardStats); // /api/v1/dashboard/stats
app.get("/pie",adminOnly,getPieStats); // /api/v1/dashboard/pie
app.get("/bar",adminOnly,getBarCharts); // /api/v1/dashboard/bar
app.get("/line",adminOnly,getLineStats); // /api/v1/dashboard/line

export default app;