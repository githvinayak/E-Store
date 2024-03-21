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

export const calculatePercentage=(thisMonth:number,lastMonth:number)=>{
  if(lastMonth===0) return thisMonth*100;
  const percentage = ((thisMonth-lastMonth)/lastMonth)*100
  return Number(percentage.toFixed(0));
}

export const getInventories = async ({
  categories,
  productsCount,
}: {
  categories: string[];
  productsCount: number;
}) => {
  const categoriesCountPromise = categories.map((category) =>
    Product.countDocuments({ category })
  );

  const categoriesCount = await Promise.all(categoriesCountPromise);

  const categoryCount: Record<string, number>[] = [];

  categories.forEach((category, i) => {
    categoryCount.push({
      [category]: Math.round((categoriesCount[i] / productsCount) * 100),
    });
  });

  return categoryCount;
};
interface MyDocument extends Document {
  createdAt: Date;
  discount?: number;
  total?: number;
}
type FuncProps = {
  length: number;
  docArr: MyDocument[];
  today: Date;
  property?: "discount" | "total";
};

export const getChartData = ({
  length,
  docArr,
  today,
  property,
}: FuncProps) => {
  const data: number[] = new Array(length).fill(0);

  docArr.forEach((i) => {
    const creationDate = i.createdAt;
    const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;

    if (monthDiff < length) {
      if (property) {
        data[length - monthDiff - 1] += i[property]!;
      } else {
        data[length - monthDiff - 1] += 1;
      }
    }
  });

  return data;
};