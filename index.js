const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const routers = require('./routes');
const refresh = require('./helpers/refresh');

dotenv.config();

const app = express()

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected to database"));

app.use(express.json())
app.use("/api", routers)

app.post("/refresh", refresh)

app.listen(port, () => {
    console.log("Server 5000.")
})