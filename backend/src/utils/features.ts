import mongoose from "mongoose";
import { InvalidateCaheType, OrderItemType } from "../types/type.js";
import { myCache } from "../app.js";
import { Product } from "../models/Product.js";

export const connectDb = (uri:string) => {
  mongoose
    .connect( uri, {
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
  userId,
  orderId,
  productId
}: InvalidateCaheType) => {
  if (product) {
    const productKeys : string[]=[
      "latest-products",
      "all-products",
      "categories",
      `products-${productId}`
    ]
    // `products-${id}`
    if (typeof productId === "string") productKeys.push(`product-${productId}`);

    if (typeof productId === "object")
      productId.forEach((i) => productKeys.push(`product-${i}`));
    
      myCache.del(productKeys);
  }
  if (order) {
    const orderKeys : string[] = [
      "all-orders",
      `my-orders-${userId}`,
      `order-${orderId}`
    ]
    myCache.del(orderKeys)
  }
  if (product) {
  }
};

export const reduceStock = async (orderItems: OrderItemType[]) => {
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if (!product) throw new Error("Product Not Found");
    product.stock -= order.quantity;
    await product.save();
  }
};