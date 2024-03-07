import express from "express" ; 
import { connectDb } from "./utils/connectdb.js";
import { errorMidleware } from "./middlewares/error.js";
const app = express();

//importing routes
import userRoute from "./routes/user.js"
import productRoute from "./routes/products.js"
//db connect
connectDb()
//port
const port = 3000;
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Api is working with /api/v1")
})

//using routes
app.use("/api/v1/user",userRoute)
app.use("/api/v1/product",productRoute)


app.use("/uploads",express.static("uploads"))
app.use(errorMidleware)

app.listen(port,()=>{
    console.log("server is literning on http://localhost:" + port);
    
})