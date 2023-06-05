const connection = require('../config/connection');

const User = require('../models');

// Import functions for seed data

// Start the seeding runtime timer


// Creates a connection to mongodb
connection.once('open', async () => {
    console.log('connected')
    // Delete the entries in the collection
    await User.deleteMany({});
    

    // Empty arrays fpr randomly generated 
    const users = [];
    
    for (let i = 0; i < 20; i++) {
        const name = getRandomUser();
        const newUser = {
            first: name.split(' ')[0],
            last: name.split(' ')[1],
            age: Math.floor(Math.random() * 99 + 1),
        };
        users.push(newUser);
    }

    await User.collection.insertMany(users);
    console.table(users);
    console.timeEnd('Seeding complete');
    process.exit(0);
})