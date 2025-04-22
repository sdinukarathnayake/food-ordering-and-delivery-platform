const express = require('express');
require('dotenv').config();
const app = express();
const cors = require("cors");

const notificationRoutes = require('./Routes/AdminNotificationRoutes');

app.use(express.json());
app.use(cors());

app.use('/api/notifications/', notificationRoutes);

const PORT = 7000;

app.listen(PORT,()=>{
    console.log(`admin notification service runninggg on port ${PORT}`);
})