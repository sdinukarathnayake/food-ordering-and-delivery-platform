const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const paymentRoutes = require('./routes/paymentRoutes');

dotenv.config();

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.use('/payments', paymentRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
  app.listen(5001, () => console.log('Payment service running on port 5001'));
}).catch(err => console.error(err));
