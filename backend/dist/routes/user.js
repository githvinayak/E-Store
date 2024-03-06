import express from "express";
import { deleteUser, getAllUsers, getSingleUser, newUser } from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";
const app = express.Router();
app.post("/new", newUser); // /api/v1/user/new
app.get("/all", adminOnly, getAllUsers); // /api/v1/user/all
app.route("/:id").get(getSingleUser).delete(adminOnly, deleteUser); // /api/v1/user/dynamicId
export default app;
