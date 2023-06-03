const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^[\w.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address!"],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thoughts"
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "Friends"
            }
        ]
    }
)
