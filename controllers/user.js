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
    const { email, password, username, isSuperAdmin, balance } = req.body;
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
            isSuperAdmin,
            email,
            balance,
        })

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2h" })
        res.status(201).json({ result, token })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" })

    }
});

//Login
const signIn = asyncMiddleware(async function (req, res) {

    const { email: reqEmail, password } = req.body;
    try {

        const existingUser = await User.findOne({ email: reqEmail });
        if (!existingUser)
            return res.status(404).json({ message: "User not found" });

        const { email, _id: id, isSuperAdmin } = existingUser
        const jwtPayload = { email, id, isSuperAdmin }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect)
            return res.status(4000).json({ message: "Invalid password" });
        const accessToken = jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })
        const refreshToken = jwt.sign(jwtPayload, process.env.REFRESH_TOKEN_SECRET)
        res.status(200).json({ result: existingUser, accessToken, refreshToken })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" })
    }

})

//Update
const update = asyncMiddleware(async function (req, res) {
    const { id } = req.params;
    const { usernam, isSuperAdmin, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ id });
        if (!existingUser)
            return res.status(404).json({ message: "User not found" });

        if (username) existingUser.username = username;
        if (isSuperAdmin) existingUser.isSuperAdmin = isSuperAdmin;
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


//Users Balance List
const balance = asyncMiddleware(async function (req, res) {

    try {
        const { _id: id, isSuperAdmin } = req?.user
        if (isSuperAdmin)
            return res.json({ result: await User.find({}, 'username balance') });

        res.json({ result: await User.findOne({ _id: req.user.id }, 'username balance') });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" })

    }
});

module.exports = { signUp, signIn, update, deleteUser, balance };