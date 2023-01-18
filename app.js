require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
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
app.use(cors())
app.use((req, res, next)=>{
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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