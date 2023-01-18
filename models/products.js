const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the product name"],
        trim: true
    },
    brand: {
        type: String,
        required: [true, "Please enter the product brand"],
    },
    description: {
        type: String,
        required: [true, "Please enter the product description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter the product price"],
        maxLength: [10, "Price cannot exceed 10 digits"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [String],
    category: {
        type: String,
        required: [true, "Please enter the product category"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter the product stock"],
        maxLength: [5, "Price cannot exceed 5 digits"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ]
},{timestamps: true})

module.exports = mongoose.model("Product", productSchema)


// https://ecommerce-api-production.up.railway.app/api/products