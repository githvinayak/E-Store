import express from "express";
import { connectDb } from "./utils/features.js";
import { errorMidleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from "morgan";
config({
    path: "./.env"
});
//importing routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";
import orderRoute from "./routes/order.js";
//db connect
const DATABASE_URI = process.env.DATABASE_URL || "";
connectDb(DATABASE_URI);
//creating instance of cache
export const myCache = new NodeCache();
//port
const port = process.env.PORT || 3000;
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Api is working with /api/v1");
});
//using routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/uploads", express.static("uploads"));
app.use(errorMidleware);
app.listen(port, () => {
    console.log("server is literning on http://localhost:" + port);
});
