const { Schema, model } = require('mongoose');

// Step 1:
// thoughtText
    // String
    // Required
    // Must be between 1 and 280 characters
const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => timeSince(date),
        },
        username: {
           type: String,
           required: true,
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'reactions',
            }
        ],
        toJSON: { 
            getters: true, virtuals: true,
            timestamps: true,
        },
        id: false,
        }

)
// CreatedAt
    // Date
    // Set default value to the current timestamp
    // Use a getter method to format the timestamp on query

// username (The user that created this thought)
    // String
    // Required

// reactions (Replies)
    // Array of nested documents created with the reactionsSchema

// Step 2:
// Schema settings
// Create a virtual called reactionCount that retrieves the length of the thoughts reactions array field on query.

