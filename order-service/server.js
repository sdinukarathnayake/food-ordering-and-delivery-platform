const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.use('/orders', orderRoutes);
 
//mongodb connection string
const connectionString = process.env.MONGO_URI;

mongoose.connect(connectionString)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
        console.log(err)
        process.exit(1);
    })

const port = 5000;
app.listen(port, () => console.log("Order service running on port 5000"));