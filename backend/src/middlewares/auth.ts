import { TryCatch } from "./error.js";
import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";

export const adminOnly = TryCatch(async (req, res, next) => {
  const { id } = req.query;
  if (!id) return next(new ErrorHandler("Please login first", 401));
  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("Id invalid", 401));
  if (user.role !== "admin")
    return next(new ErrorHandler("Admin only access", 403));
  next();
});
