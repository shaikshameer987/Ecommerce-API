const Product = require("../models/products")
const errorHandler = require("../utilities/errorHandler")

module.exports.createProduct = async (req, res, next) => {
    try {
        const name = req.body.name
        const existingProduct = await Product.findOne({name})
        if(existingProduct){
            errorHandler(res, 400, "Product name already exists, please use another name")
            next()
        }
        const newProduct = await Product.create(req.body)
        await newProduct.save()
        return res.status(201).json({
            success: true,
            data: newProduct
        })
    } catch(error){
        errorHandler(res, undefined, error.message)
        next()
    }
}

module.exports.updateProduct = async (req, res, next) => {
    const id = req.params.id
    try {
        const existingProduct = await Product.findById(id)
        if(existingProduct){
            const {name, description, price, category, stock} = req.body
            const existingProductName = await Product.findOne({name})
            if(existingProductName){
                errorHandler(res, 400, "Product name already exists, please use another name")
                next()
            }
            if(name) existingProduct.name = name
            if(description) existingProduct.description = description
            if(price) existingProduct.price = price
            if(category) existingProduct.category = category
            if(stock) existingProduct.stock = stock

            await existingProduct.save()

            return res.status(201).json({
                success: true,
                data: existingProduct
            })
        }else{
            errorHandler(res, 404, "Product not Found")
            next()
        }
    } catch(error) {
        let message = error.name === "CastError" ? "Product not Found" : error.message
        errorHandler(res, error.name === "CastError" ? 404 : undefined, message)
        next()
    }
}

module.exports.deleteProduct = async (req, res, next) => {
    const id = req.params.id
    try{
        const existingProduct = await Product.findById(id)
        if(!existingProduct){
            errorHandler(res, 404, "Product not Found")
            next()
        }
        await existingProduct.remove()
        return res.status(201).json({
            success: true,
            message: "Product deleted successfully"
        })
    } catch(error) {
        let message = error.name === "CastError" ? "Product not Found" : error.message
        errorHandler(res, error.name === "CastError" ? 404 : undefined, message)
        next()
    }
}

module.exports.getAllProducts = async (req, res, next) => {
    try {
        let products
        const category = req.query.category ? { category : { $regex: req.query.category, $options: "i" }} : {}
        const keyword = req.query.keyword ? { name : { $regex: req.query.keyword, $options: "i" }} : {}
        const price = req.query.price ? { price : req.query.price } : {}
        const dbFormatPrice = JSON.parse(JSON.stringify(price).replace("gte","$gte").replace("lte","$lte"))
        const brand = req.query.brand ? { brand : { $regex: req.query.brand , $options: "i" }} : {}
        products = await Product.find({
            $and: [category, keyword, dbFormatPrice, brand]
        })
        return res.status(200).json({
            success: true,
            data: products
        })
    } catch(error) {
        errorHandler(res, undefined, error.messgae)
        next()
    }
}