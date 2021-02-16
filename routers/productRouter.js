const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel.js");
const data = require('../data.js');
const { isAdmin, isAuth } = require("../utils.js");

const productRouter = express.Router();

productRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || "";
    const category = req.query.category || "";
    const order = req.query.order || '';
    const min =
    req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
    req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const sortOrder =
    order === 'lowest'
      ? { price: 1 }
      : order === 'highest'
      ? { price: -1 }
      : { _id: -1 };
    const count = await Product.count({
        ...nameFilter,
        ...categoryFilter,
        ...priceFilter,
    });
    const products = await Product.find({
        ...nameFilter,
        ...categoryFilter,
        ...priceFilter,
    })
    .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);
    res.send({ products, page, pages: Math.ceil(count / pageSize) });
    })
);

productRouter.get(
    "/categories",
    expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct("category");
    res.send(categories);
    })
);

productRouter.get(
    "/seed",
    expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const products = data.products.map((product) => ({
        ...product,
    }));
    const createdProducts = await Product.insertMany(products);
    res.send({ createdProducts });
    }
    )
);

productRouter.get("/",async(req,res)=>{
    try{
        let product=await Product.find()
        res.status(200).json({msg:"List of all products",product})
    }catch (err){
        res.json(err)
    }
});

productRouter.get(
    "/:id",
    expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: "Product Not Found" });
    }
    })
);

productRouter.post(
    "/create",
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
    const product = new Product({
        name:req.body.name ,
        image: req.body.image,
        price:req.body.price,
        category:req.body.category,
        brand:req.body.brand,
        countInStock:req.body.countInStock,
        description:req.body.description,
    });
    const createdProduct = await product.save();
    res.send({ message: "Product Created",
    _id: createdProduct._id,
    name: createdProduct.name + Date.now(),
    image: createdProduct.image,
    price: createdProduct.price,
    category: createdProduct.category,
    brand: createdProduct.brand,
    countInStock: createdProduct.countInStock,
    description: createdProduct.description
    });
    })
);

productRouter.put(
    "/:id",
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        res.send({ message: "Product Updated", product: updatedProduct });
    } else {
        res.status(404).send({ message: "Product Not Found" });
    }
    })
);

productRouter.delete(
    "/:id",
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        const deleteProduct = await product.remove();
        res.send({ message: "Product Deleted", product: deleteProduct });
    } else {
        res.status(404).send({ message: "Product Not Found" });
    }
    })
);

module.exports = productRouter;
