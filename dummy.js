// require("dotenv").config()
// const mongoose = require("mongoose")

// const Product =  require("./models/products")
// const productsData = require("./products.json")

// // function to add documents to the Customer collection in DB.
// const start = async () => {
//     try {
//         await mongoose.connect(process.env.DATABASE_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         })
//         await Product.create(productsData)
//     } catch (error) {
//         console.log(error)
//     }
// }

// start()