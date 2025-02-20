const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const conectToDb = require('./db/db');
const userRoute = require('./routes/UserRoute');
const captainRoute = require('./routes/caption.routes');
const rideRoute = require('./routes/ride.routes');
const mapsRoutes = require('./routes/maps.routes');
conectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/",(req,res) => {
    res.send("Hello World")
})

app.use('/users',userRoute);
app.use('/captains',captainRoute);
app.use('/maps',mapsRoutes);
app.use('/rides',rideRoute);


module.exports = app;