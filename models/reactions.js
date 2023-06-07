const { Schema, Types } = require('mongoose');

const reactionsSchema = new Schema({
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
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
      get: (date) => new Date(date).toLocaleDateString(),
    }
  }, {
    toJSON: {
      getters: true
    },
    id: false,
    _id: false
});

module.exports = reactionsSchema;