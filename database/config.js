
const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {
    try {
        mongoose.connect(process.env.DB_CNN);
        console.log('DB Online')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    dbConnection,
}