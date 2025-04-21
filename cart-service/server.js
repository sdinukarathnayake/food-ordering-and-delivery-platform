const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const cartRoutes = require('./routes/cartRoutes');

dotenv.config();

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.use('/cart', cartRoutes);

//mongodb connection string
const connectionString = process.env.MONGO_URI;

mongoose.connect(connectionString)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
        console.log(err)
        process.exit(1);
    })

const port = 5003;
app.listen(port, () => console.log("Customer service running on port 5003"));