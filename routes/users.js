const express = require('express')
const { update, deleteUser,balance } = require('../controllers/user')

const router = express.Router();

router.patch("/update", update);
router.delete("/delete", deleteUser);
router.get("/balance",balance)
module.exports = router;