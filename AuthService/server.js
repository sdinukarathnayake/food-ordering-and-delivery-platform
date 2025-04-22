const mongooose = require('mongoose');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser')
const path = require('path');
const app = express();

const userRoutes = require('./Routes/UserRoutes');
const resturantRoutes = require('./Routes/ResturantRoutes');
const deliveryPersonRoutes = require('./Routes/DeliveryPersonRoutes');


const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/users/',userRoutes);
app.use('/api/resturants/',resturantRoutes);
app.use('/api/deliveryPerson/',deliveryPersonRoutes);

const CONNECTION_STRING=process.env.CONNECTION_STRING;

mongooose.connect(CONNECTION_STRING)
    .then(()=>console.log("auth service DB connected"))
    .catch((err)=>{
        console.log(err)
        process.exit(1);
    })

const port =7001;
app.listen(port,()=>console.log(`auth service running in port ${port}`))