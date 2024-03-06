import { NextFunction, Request, Response } from "express";
import ErrorHndler from "../utils/utility-class.js";
import { ControllerType } from "../types/type.js";

export const errorMidleware = (
  err: ErrorHndler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export const TryCatch =
  (func: ControllerType) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
  };
