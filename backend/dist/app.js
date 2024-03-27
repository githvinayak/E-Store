import express from "express";
import { connectDb } from "./utils/features.js";
import { errorMidleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from "morgan";
import Stripe from "stripe";
import cors from "cors";
//importing routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";
import orderRoute from "./routes/order.js";
import couponRoute from "./routes/payment.js";
import dashboardRoute from "./routes/stats.js";
config({
    path: "./.env"
});
//db connect
const port = process.env.PORT || 4000;
const mongoURI = process.env.DATABASE_URL || "";
const stripeKey = process.env.STRIPE_KEY || "";
connectDb(mongoURI);
export const stripe = new Stripe(stripeKey);
//creating instance of cache
export const myCache = new NodeCache();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.get("/", (req, res) => {
    res.send("Api is working with /api/v1");
});
//using routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", couponRoute);
app.use('/api/v1/dashboard', dashboardRoute);
app.use("/uploads", express.static("uploads"));
app.use(errorMidleware);
app.listen(port, () => {
    console.log("server is literning on http://localhost:" + port);
});
