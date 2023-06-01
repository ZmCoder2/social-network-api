const connection = require('../config/connection');

const { Username, Email, Thoughts, Friends } = require('../models');

// Import functions for seed data

// Start the seeding runtime timer


// Creates a connection to mongodb
connection.once('open', async () => {
    // Delete the entries in the collection
    await Username.deleteMany({});
    await Email.deleteMany({});
    await Thoughts.deleteMany({});
    await Friends.deleteMany({});

    // Empty arrays fpr randomly generated 
    const users = [];
    const emails = [];
    const thoughts = [];
    const friends = [];

    // Frunction to make a post object and push it into the users array
    const createUser = (text) => {
        users.push({
            
        })
    }
})