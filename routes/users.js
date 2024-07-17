const express = require('express')
const { signUp, signIn, update, deleteUser } = require('../controllers/user')
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.patch("/update", update);
router.delete("/delete", deleteUser);

module.exports = router;