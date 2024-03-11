import { TryCatch } from "../middlewares/error.js";
import { Product } from "../models/Product.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";
import { myCache } from "../app.js";
import { invalidateCache } from "../utils/features.js";
//revalidate on New,update and delete products and on New order
export const getLatestProducts = TryCatch(async (req, res, next) => {
    let products;
    const key = "latest-products";
    if (myCache.has(key))
        products = JSON.parse(myCache.get(key));
    else {
        products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
        myCache.set(key, JSON.stringify(products));
    }
    return res.status(200).json({
        success: true,
        products,
    });
});
//revalidate on New,update and delete products and on New order
export const getAllCategories = TryCatch(async (req, res, next) => {
    let categories;
    const key = "categories";
    if (myCache.has(key))
        categories = JSON.parse(myCache.get(key));
    else {
        categories = await Product.distinct("category");
        myCache.set("categories", JSON.stringify(categories));
    }
    return res.status(200).json({
        success: true,
        categories,
    });
});
export const getAdminProducts = TryCatch(async (req, res, next) => {
    let products;
    const key = "all-products";
    if (myCache.has(key))
        products = JSON.parse(myCache.get(key));
    else {
        products = await Product.find({});
        myCache.set(key, JSON.stringify(products));
    }
    return res.status(200).json({
        success: true,
        products,
    });
});
export const getSingleProduct = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const key = `product-${id}`;
    let product;
    if (myCache.has(key))
        product = JSON.parse(myCache.get(key));
    else {
        product = await Product.findById(id);
        if (!product)
            return next(new ErrorHandler("Product Not Foud", 404));
        myCache.set(key, JSON.stringify(product));
    }
    return res.status(200).json({
        success: true,
        product,
    });
});
export const newProduct = TryCatch(async (req, res, next) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    if (!photo)
        return next(new ErrorHandler("Please add Photo", 400));
    if (!name || !price || !stock || !category) {
        rm(photo.path, () => {
            console.log("Deleted");
        });
        return next(new ErrorHandler("Please enter All Fields", 400));
    }
    await Product.create({
        name,
        price,
        stock,
        category: category.toLowerCase(),
        photo: photo?.path,
    });
    await invalidateCache({ product: true });
    return res.status(201).json({
        success: true,
        message: "Product Created Successfully",
    });
});
export const updateProduct = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    const product = await Product.findById(id);
    if (!product)
        return next(new ErrorHandler("No product found with this ID", 404));
    if (photo) {
        rm(product.photo, () => {
            console.log(" old photo Deleted");
        });
        product.photo = photo.path;
    }
    if (name)
        product.name = name;
    if (price)
        product.price = price;
    if (stock)
        product.stock = stock;
    if (category)
        product.category = category;
    await product.save();
    await invalidateCache({ product: true, productId: String(product._id) });
    return res.status(200).json({
        success: true,
        message: "Product updated Successfully",
    });
});
export const deleteProduct = TryCatch(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product)
        return next(new ErrorHandler("No product found with this ID", 404));
    rm(product.photo, () => {
        console.log(" old photo Deleted");
    });
    await product.deleteOne();
    await invalidateCache({ product: true, });
    return res.status(200).json({
        success: true,
        message: "Product deleted Successfully",
    });
});
export const getAllProducts = TryCatch(async (req, res, next) => {
    const { search, sort, category, price } = req.query;
    const page = Number(req.query.page) || 1;
    // 1,2,3,4,5,6,7,8
    // 9,10,11,12,13,14,15,16
    // 17,18,19,20,21,22,23,24
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;
    const baseQuery = {};
    if (search)
        baseQuery.name = {
            $regex: search,
            $options: "i",
        };
    if (price)
        baseQuery.price = {
            $lte: Number(price),
        };
    if (category)
        baseQuery.category = category;
    const productsPromise = Product.find(baseQuery)
        .sort(sort && { price: sort === "asc" ? 1 : -1 })
        .limit(limit)
        .skip(skip);
    const [products, filteredOnlyProduct] = await Promise.all([
        productsPromise,
        Product.find(baseQuery),
    ]);
    const totalPage = Math.ceil(filteredOnlyProduct.length / limit);
    return res.status(200).json({
        success: true,
        products,
        totalPage,
    });
});
// const generateRandomProducts = async (count: number = 10) => {
//     const products = [];
//     for (let i = 0; i < count; i++) {
//       const product = {
//         name: faker.commerce.productName(),
//         photo: "uploads\\372c8a47-efd6-41db-8dc5-d82427a6cb69.png",
//         price: faker.commerce.price({ min: 1500, max: 80000, dec: 0 }),
//         stock: faker.commerce.price({ min: 0, max: 100, dec: 0 }),
//         category: faker.commerce.department(),
//         createdAt: new Date(faker.date.past()),
//         updatedAt: new Date(faker.date.recent()),
//         __v: 0,
//       };
//       products.push(product);
//     }
//     await Product.create(products);
//     console.log({ succecss: true });
//   };
// const deleteRandomsProducts = async (count: number = 10) => {
//   const products = await Product.find({}).skip(2);
//   for (let i = 0; i < products.length; i++) {
//     const product = products[i];
//     await product.deleteOne();
//   }
//   console.log({ succecss: true });
// };
