const express = require("express")

const router = express.Router()

router.route("/regsiter").post((req, res) => {
    return res.status(201).json({message: "User Registered Successfully"})
})

router.route("/login").post((req, res) => {
    return res.status(201).json({message: "User Loggedin Successfully"})
})

module.exports = router