const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const mongoose = require('mongoose');

// Current working directory
// const cwd = process.cwd();

// https:localhost:3001
const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.set('debug', true);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server is running on ${PORT}`);
    });
});