const mongoose = require('mongoose');
const env = require('dotenv');
env.config();

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then(() => {
    console.log('Database connected');
});
