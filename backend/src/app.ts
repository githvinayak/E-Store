import express from "express" ; 
import { connectDb } from "./utils/features.js";
import { errorMidleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import {config} from "dotenv"
import morgan from "morgan"
import Stripe from "stripe";

config({
    path:"./.env"
})

//importing routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";
import orderRoute from "./routes/order.js";
import couponRoute from "./routes/payment.js"
import dashboardRoute from "./routes/stats.js"
//db connect
const DATABASE_URI = process.env.DATABASE_URL || "";
const STRIPE_KEY = process.env.STRIPE_KEY || "";
connectDb(DATABASE_URI)

export const stripe = new Stripe(STRIPE_KEY);
//creating instance of cache
export const myCache = new NodeCache();
//port
const port = process.env.PORT || 3000;

const app = express();
app.use(morgan("dev"))
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Api is working with /api/v1")
})

//using routes
app.use("/api/v1/user",userRoute)
app.use("/api/v1/product",productRoute)
app.use("/api/v1/order",orderRoute)
app.use("/api/v1/payment",couponRoute)
app.use('/api/v1/dashboard',dashboardRoute)


app.use("/uploads",express.static("uploads"))
app.use(errorMidleware)

app.listen(port,()=>{
    console.log("server is literning on http://localhost:" + port);
    
})