const mongoose = require('mongoose');
const User = require('./models/User');

const userList =[];
userList[0]= usrSuperAdmin = new User.create({
    username: 'Ali',
    password:'1234',
    userType:'superAdmin',
})

userList[1]=  usrAdmin = new User.create({
    username: 'Ali',
    password:'1234',
    userType:'admin',
})

userList[2]=  usrStandart = new User.create({
    username: 'Ali',
    password:'1234',
    userType:'standart',
})