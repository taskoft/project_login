"use strict";
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');

//Helper functions
function asyncMiddleware(fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

//SignUp

const signUp = asyncMiddleware(async function (req, res) {
    const { username, password, userType, email } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "Email adress already using" });


        if (!password)
            return res.status(400).json({ message: "Password is required" });

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({
            username,
            password: hashedPassword,
            userType,
            email,
        })
        //result._id?
        const token = jwt.sign({ email: result.email, id: result._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2h" })
        res.status(201).json({ result, token })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" })

    }
});

module.exports={signUp};