const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const cors = require('cors');
const conectToDb = require('./db/db');
const userRoute = require('./routes/UserRoute');

conectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res) => {
    res.send("Hello World")
})

app.use('/users',userRoute);
module.exports = app;