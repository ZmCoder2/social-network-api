const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Current working directory
const cwd = process.cwd();


// https:localhost:3001
const PORT = 3001;
const app = express();



db.once('open', () => {
    app.listen(PORT, () => {
        console.log//(`API server for ${} running on port ${PORT}!`);
    });
});