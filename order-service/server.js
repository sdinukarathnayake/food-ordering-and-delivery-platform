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

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Order service running on port 5000'));
}).catch(err => console.error(err));
