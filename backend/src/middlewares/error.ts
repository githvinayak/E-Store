import { NextFunction, Request, Response } from "express";
import ErrorHndler from "../utils/utility-class.js";

export const errorMidleware = (
  err: ErrorHndler,
  req: Request,
  res: Response,
  next: NextFunction
) => {

    err.message ||= "Internal Server Error"
    err.statusCode ||= 500;
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
