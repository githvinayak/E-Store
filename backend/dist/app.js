import express from "express";
import userRoute from "./routes/user.js";
import { connectDb } from "./utils/connectdb.js";
import { errorMidleware } from "./middlewares/error.js";
const app = express();
connectDb();
const port = 3000;
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Api is working with /api/v1");
});
//using routes
app.use("/api/v1/user", userRoute);
app.use(errorMidleware);
app.listen(port, () => {
    console.log("server is literning on http://localhost:" + port);
});
