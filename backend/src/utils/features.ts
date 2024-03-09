import mongoose from "mongoose";
import { InvalidateCaheType } from "../types/type.js";
import { myCache } from "../app.js";
import { Product } from "../models/Product.js";

export const connectDb = () => {
  mongoose
    .connect("mongodb://localhost:27017", {
      dbName: "Ecom24",
    })
    .then((c) =>
      console.log(`mongodb is connected successfully to ${c.connection.host}`)
    )
    .catch((err) => console.log(err));
};

export const invalidateCache = async({
  product,
  order,
  admin,
}: InvalidateCaheType) => {
  if (product) {
    const productKeys : string[]=[
      "latest-products",
      "all-products",
      "categories",
      ""
    ]
    // `products-${id}`
    const products = await Product.find({}).select("_id")
    products.forEach( i =>{
      productKeys.push( `products-${i._id}`)
    } )
    myCache.del(productKeys)
  }
  if (product) {
  }
  if (product) {
  }
};
