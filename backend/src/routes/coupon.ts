import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { applyDiscount, deleteCoupon, getAllCoupons, newCoupon } from "../controllers/coupon.js";


const app = express.Router();

app.get("/discount", applyDiscount); // /api/v1/payment/discount
app.post("/coupon/new", adminOnly,newCoupon); // /api/v1/payment/coupon/new
app.get("/coupon/all", adminOnly,getAllCoupons); // /api/v1/payment/coupon/all
app.delete("/coupon/:id",adminOnly,deleteCoupon) // /api/v1/payment/coupon/:id

export default app;
