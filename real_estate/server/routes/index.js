const orderRouter = require('./orderRoute');
const paymentRouter = require('./paymentRoute');
const projectRouter = require('./productRoute');
const userRouter = require('./userRoute');
const express = require("express");
const router = express.Router();

router.exports = {
    orderRouter,
    paymentRouter,
    projectRouter,
    userRouter
}

module.exports = router;
