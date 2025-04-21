const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');


const restaurantRoutes = require('./routes/restaurantRoutes');
const menuRoutes = require('./routes/menuRoutes');

dotenv.config();

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.use('/restaurant', restaurantRoutes);
app.use('/menu', menuRoutes);


//mongodb connection string
const connectionString = process.env.MONGO_URI;

mongoose.connect(connectionString)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
        console.log(err)
        process.exit(1);
    })

const port = 5004;
app.listen(port, () => console.log("Restaurant service running on port 5004"));