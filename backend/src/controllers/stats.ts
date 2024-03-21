import { myCache } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import { Product } from "../models/Product.js";
import { Order } from "../models/order.js";
import { User } from "../models/user.js";
import { calculatePercentage, getChartData,
  getInventories, } from "../utils/features.js";

export const getDashboardStats = TryCatch(async (req, res, next) => {
  let stats;
  const key = "admin-stats";

  if (myCache.has("admin-stats"))
    stats = JSON.parse(myCache.get(key) as string);
  else {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const thisMonth = {
      start: new Date(today.getFullYear(), today.getMonth(), 1),
      end: today,
    };
    const lastMonth = {
      start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
      end: new Date(today.getFullYear(), today.getMonth(), 0),
    };
    const thisMonthProductsPromise = Product.find({
      createdAt: { $gte: thisMonth.start, $lt: thisMonth.end },
    });

    const lastMonthProductsPromise = Product.find({
      createdAt: { $gte: lastMonth.start, $lt: lastMonth.end },
    });

    const thisMonthUsersPromise = User.find({
      createdAt: { $gte: thisMonth.start, $lt: thisMonth.end },
    });

    const lastMonthUsersPromise = User.find({
      createdAt: { $gte: lastMonth.start, $lt: lastMonth.end },
    });

    const thisMonthOrdersPromise = Order.find({
      createdAt: { $gte: thisMonth.start, $lt: thisMonth.end },
    });

    const lastMonthOrdersPromise = Order.find({
      createdAt: { $gte: lastMonth.start, $lt: lastMonth.end },
    });
    const lastSixMonthOrdersPromise = Order.find({
      createdAt: {
        $gte: sixMonthsAgo,
        $lte: today,
      },
    });

    const latestTransactionsPromise = Order.find({})
      .select(["orderItems", "discount", "total", "status"])
      .limit(4);

    const [
      thisMonthOrders,
      thisMonthProducts,
      thisMonthUsers,
      lastMonthOrders,
      lastMonthProducts,
      lastMonthUsers,
      productsCount,
      usersCount,
      allOrders,
      lastSixMonthOrders,
      categories,
      femaleUsersCount,
      latestTransaction,
    ] = await Promise.all([
      thisMonthOrdersPromise,
      thisMonthProductsPromise,
      thisMonthUsersPromise,
      lastMonthOrdersPromise,
      lastMonthProductsPromise,
      lastMonthUsersPromise,
      Product.countDocuments(),
      User.countDocuments(),
      Order.find({}).select("total"),
      lastSixMonthOrdersPromise,
      Product.distinct("category"),
      User.countDocuments({ gender: "female" }),
      latestTransactionsPromise,
    ]);

    const thisMonthRevenue = thisMonthOrders.reduce(
      (total, order) => total + (order.total || 0),
      0
    );
    const lastMonthRevenue = lastMonthOrders.reduce(
      (total, order) => total + (order.total || 0),
      0
    );

    const changePercentage = {
      revenue: calculatePercentage(thisMonthRevenue, lastMonthRevenue),
      products: calculatePercentage(
        thisMonthProducts.length,
        lastMonthProducts.length
      ),
      users: calculatePercentage(thisMonthUsers.length, lastMonthUsers.length),
      orders: calculatePercentage(
        thisMonthOrders.length,
        lastMonthOrders.length
      ),
    };

    const revenue = allOrders.reduce(
      (total, order) => total + (order.total || 0),
      0
    );

    const count = {
      revenue,
      product : productsCount,
      user : usersCount,
      orders : allOrders.length
    }

    stats = {
      changePercentage,
      count
    };
    const orderMonthCounts = new Array(6).fill(0);
    const orderMonthyRevenue = new Array(6).fill(0);

    lastSixMonthOrders.forEach((order) => {
      const creationDate = order.createdAt;
      const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;

      if (monthDiff < 6) {
        orderMonthCounts[6 - monthDiff - 1] += 1;
        orderMonthyRevenue[6 - monthDiff - 1] += order.total;
      }
    });

    const categoryCount = await getInventories({
      categories,
      productsCount,
    });

    const userRatio = {
      male: usersCount - femaleUsersCount,
      female: femaleUsersCount,
    };

    const modifiedLatestTransaction = latestTransaction.map((i) => ({
      _id: i._id,
      discount: i.discount,
      amount: i.total,
      quantity: i.orderItems.length,
      status: i.status,
    }));

    stats = {
      categoryCount,
      changePercentage,
      count,
      chart: {
        order: orderMonthCounts,
        revenue: orderMonthyRevenue,
      },
      userRatio,
      latestTransaction: modifiedLatestTransaction,
    };

    myCache.set(key, JSON.stringify(stats));
  }

  return res.status(200).json({
    success: true,
    stats,
  });
});

export const getPieStats = TryCatch(async (req,res) => {
  let charts;
  if(myCache.has("admin-pie-charts"))charts = JSON.parse(myCache.get("admin-pie-charts") as string);
  else{
    const [processingOrder,shippedOrder,deliveredOrder] = await Promise.all([
      Order.countDocuments({status:"Processing"}),
      Order.countDocuments({status:"Shipped"}),
      Order.countDocuments({status:"Delivered"}),
    ])

    const orderFullFillMent = {
      processing:processingOrder,
      shipped:shippedOrder,
      delivered:deliveredOrder
    }

    charts={
      orderFullFillMent
    }
    myCache.set("admin-pie-charts",JSON.stringify(charts))
    }
    return res.json({
      success:true,
      charts
  })
});
export const getBarStats = TryCatch(async () => {});
export const getLineStats = TryCatch(async () => {});
