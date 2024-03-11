import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import {
  newOrder,
  myOrders,
  allOrders,
  getSingleOrder,
  processOrder,
  deleteOrder,
} from "../controllers/order.js";

const app = express.Router();

app.post("/new", newOrder); // /api/v1/order/new
app.get("/my", myOrders); // /api/v1/order/my
app.get("/all", adminOnly, allOrders); // /api/v1/order/all
app
  .route("/:id")
  .get(getSingleOrder)
  .put(adminOnly, processOrder)
  .delete(adminOnly, deleteOrder); // /api/v1/order/:id

export default app;
