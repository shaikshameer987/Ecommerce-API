
module.exports.errorMiddleware = (req, res, next) => {
    const message = res.message || "Server Error"
    const statusCode = res.statusCode || 500;
    return res.status(statusCode).json({
        success: false,
        message
    })
}


