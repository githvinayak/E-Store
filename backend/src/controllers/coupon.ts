import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";
import { Coupon } from "../models/coupon.js";

export const newCoupon = TryCatch(async (req, res, next) => {
    const { coupon, amount } = req.body;
  
    if (!coupon || !amount)
      return next(new ErrorHandler("Please enter both coupon and amount", 400));
  
    await Coupon.create({ code: coupon, amount });
  
    return res.status(201).json({
      success: true,
      message: `Coupon ${coupon} Created Successfully`,
    });
  });

  export const applyDiscount = TryCatch(async (req, res, next) => {
    const { coupon} = req.query;
  const discount = await Coupon.findOne({ code: coupon})

    if (!discount)
      return next(new ErrorHandler("coupon is not valid", 400));
  
    return res.status(200).json({
      success: true,
     discount:discount.amount,
    });
  });

  export const getAllCoupons = TryCatch(async (req, res, next) => {
  const coupons = await Coupon.find({})

    if (!coupons)
      return next(new ErrorHandler("coupons not found", 400));
  
    return res.status(200).json({
      success: true,
     coupons,
    });
  });

  export const deleteCoupon = TryCatch(async (req, res, next) => {
    const  {id} = req.params;
    const coupon =  await Coupon.findById(id)
    if(!coupon) return next(new ErrorHandler("Invalid coupon Id",400));
    await coupon.deleteOne();
      return res.status(200).json({
        success: true,
      message:"coupon deleted successfully"
      });
    });