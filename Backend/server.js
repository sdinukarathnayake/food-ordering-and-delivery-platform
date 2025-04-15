const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// customer routes
const customerRoutes = require('./Routes/Customer/CustomerRoutes');
const cartRoutes = require('./Routes/Customer/CartRoutes');
const orderRoutes = require('./Routes/Customer/OrderRoutes');

app.use('/api/customers', customerRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);

//mongodb connection string
const connectionString = process.env.CONNECTION_STRING;

mongoose.connect(connectionString)
    .then(() => console.log("database connected"))
    .catch((err) => {
        console.log(err)
        process.exit(1);
    })

const port = 7001;
app.listen(port, () => console.log("server running in port 7001"));
