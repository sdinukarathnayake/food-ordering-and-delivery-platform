const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

const menuRoutes = require('./routes/menuRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); 

// api endpoints
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/menu', menuRoutes);
app.use('/images', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

const CONNECTION_STRING=process.env.MONGO_URI;

mongoose.connect(CONNECTION_STRING)
    .then(()=>console.log("DB connected"))
    .catch((err)=>{
        console.log(err)
        process.exit(1);
    })

const port = 5004;
app.listen(port,()=>console.log(`App running in port ${port}`))