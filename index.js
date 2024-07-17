//refreshtoken bak

const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./models/User');
const { authMiddlewares } = require('./middlewares');
const userRouter =require('./routes/users')


dotenv.config();

const app = express()
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URL);
const db=mongoose.connection;
db.on("error",(err)=>console.error(err));
db.once("open",()=>console.log("Connected to database"));




app.use(express.json())
app.use("/users",userRouter)



/*const user = {
    username: "ali",
    password: "123456",
    userType: "admin"
}*/

var newUser = User();
newUser.username="hasan";
newUser.password="4444";
newUser.userType="admin";

/*const usr1 = new User.create({
    username: 'Ali',
    password:'1234',
    userType:'Admin',
})*/


/*app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (username !== user.username || password !== user.password)
        return res.status(401).json({ message: "Bilgiler uyuşmuyor." });

    const accessToken = jwt.sign({ user: user.username, password: user.password }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '2m'
    })
    const refreshToken = jwt.sign({ user: user.username, password: user.password }, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken);
    return res.status(200).json({ accessToken, refreshToken });

})*/


/*app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (username !== newUser.username || password !== newUser.password)
        return res.status(401).json({ message: "Bilgiler uyuşmuyor." });

    const accessToken = jwt.sign({ user: newUser.username, password: newUser.password }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '2m'
    })
    const refreshToken = jwt.sign({ user: newUser.username, password: newUser.password }, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken);
    return res.status(200).json({ accessToken, refreshToken });

})*/

app.post("/logout", async (req, res) => {
console.log(refreshTokens);
   
    refreshTokens=refreshTokens.filter(token=>token!==req.body.refreshToken)
console.log(refreshTokens);
    res.sendStatus(200);
})

let refreshTokens = [];

app.post("/refresh", async (req, res) => {
    const { refreshToken } = req.body
    if (!refreshToken) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(401);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(400).json(err);
        }
        const accessToken = jwt.sign({ user: data.username, password: data.password }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '2m'
        })
        return res.status(200).json({ accessToken });
    })

})

app.listen(port, () => {
    console.log("Server 5000.Hazır")
})

const clients = [
    { name: "Adem", lastName: "Sönmez", age: "37" },
    { name: "Aslı", lastName: "Aslan", age: "27" },
    { name: "Arda", lastName: "Güler", age: "17" },
]

app.get("/clients", authMiddleware, async (req, res) => {
    
    res.json(clients);

})




//Login Events
//app.post("/login", async (req, res) => {})

//app.post("/login", async (req, res) => {})