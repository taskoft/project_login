//const express = require('express');
const jwt = require('jsonwebtoken');


const jwtMiddleware = (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1]
        if (!token) return res.sendStatus(401);

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(401).json(err);
            }
       
            req.user = user;

            next();
        })


    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed',
        })
    }
}

module.exports = { jwtMiddleware }


