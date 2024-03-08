import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody {
  name: string;
  email: string;
  photo: string;
  gender: string;
  _id: string;
  dob: Date;
}
export interface NewProductRequestBody {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
}

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export type SearchQueryType  ={
search?:string,
price?:string,
page?:string,
category?:string,
sort?:string
}

export interface BaseQuery{
  name?:{
    $regex:string,
    $options:string
  },
  price?:{
    $lte:number,
  }
  category?:string  
}