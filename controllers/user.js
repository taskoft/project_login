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
    const { email, password,username,userType } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(401).json({ message: "Email adress already using" });


        if (!password)
            return res.status(401).json({ message: "Password is required" });

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

//Login
const signIn = asyncMiddleware(async function (req, res) {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser)
            return res.status(404).json({ message: "User not found" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect)
            return res.status(4000).json({ message: "Invalid password" });
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })
        res.status(200).json({ result: existingUser, token })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" })
    }

})

//Update
const update = asyncMiddleware(async function (req, res) {
    const { id } = req.params;
    const { usernam, userType, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ id });
        if (!existingUser)
            return res.status(404).json({ message: "User not found" });

        if (username) existingUser.username = username;
        if (userType) existingUser.userType = userType;
        if (email) existingUser.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 12)
            existingUser.password = hashedPassword;
        }
        const updateUser = await existingUser.save();
        res.status(200).json({ result: updateUser });

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" })
    }
})

//Delete
const deleteUser = asyncMiddleware(async function (req, res) {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete({ id });
        if (!deletedUser)
            return res.status(404).json({ message: "User not found" });


        res.status(200).json({ result: deletedUser });

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" })
    }
})

module.exports = { signUp, signIn, update,deleteUser };