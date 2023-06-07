const { Schema, model } = require('mongoose');
const reactionsSchema = require('./reactions')
// Define the thoughts schema
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
        default: Date.now(),
        get: (date) => new Date(date).toLocaleDateString,
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [reactionsSchema], // Embed the reactions schema as an array
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
    }
  );

thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thoughts = model('Thoughts', thoughtsSchema);


module.exports = Thoughts;
