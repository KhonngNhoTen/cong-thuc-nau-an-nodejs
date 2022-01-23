const mongoose = require('mongoose');
const URL = require('./createURL');

async function createConnection(){
    return await mongoose.connect(URL()).catch(e => false);
}

const connection = createConnection();
if(connection) console.log('MongoDB is connected successfully');
else console.log('MongoDB is connected fail');

module.exports = mongoose;

