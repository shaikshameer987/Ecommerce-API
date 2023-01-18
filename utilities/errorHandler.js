module.exports = errorHandler = (res, statusCode, message) => {
    res.message = message
    res.statusCode = statusCode
    return 
}