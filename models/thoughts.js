const { Schema, model } = require('mongoose');

// Define the reactions schema
const reactionsSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 250,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: (date) => timeSince(date),
    },

});

// Define the thoughts schema
const thoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: (date) => timeSince(date),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionsSchema], // Embed the reactions schema as an array
});

thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thoughts = model('Thoughts', thoughtsSchema);
// const Reactions = model('Reactions', reactionsSchema);

module.exports = Thoughts;
