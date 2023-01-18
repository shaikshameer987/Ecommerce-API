require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
mongoose.set('strictQuery', false)

process.on("uncaughtException", (err) => {
    console.log("Error " + err.message )
    console.log("Shutting down the server")
    process.exit(1)
})

const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productsRoutes")
const { errorMiddleware } = require("./middleware/errorHandler")

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())

app.use("/api/user", userRoutes)
app.use("/api/products", productRoutes)
app.use(errorMiddleware)

const server = app.listen(PORT, () => {
    console.log("Server started...")
})

// connecting to DB
mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to database successfully"))
.catch(error => {
    console.log(error.message)
    console.log("Shutting down the server")
    // closing the server if there is error in connecting to DB.
    server.close(() => {
        process.exit(1)
    })
})

process.on("unhandledRejection", (err) => {
    console.log("Error " + err.message )
    console.log("Shutting down the server")
    server.close(() => {
        process.exit(1)
    })
})