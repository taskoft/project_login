const express = require('express')
const { jwtMiddleware } = require('../middlewares/jwtmiddleware');
const { authMiddleware } = require('../middlewares/authmiddleware');
//routers
const auth=require("./auth")
const users=require("./users")

const router = express.Router()

router.use("/auth",auth);
router.use(jwtMiddleware);
router.use(authMiddleware);
router.use("/users",users)

module.exports=router;
