const { connect, connection } = require('mongoose');

const connectionString = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/socialNetwork_db';
connect(connectionString);

module.exports = connection