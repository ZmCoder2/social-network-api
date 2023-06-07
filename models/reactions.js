const { Schema } = require('mongoose');

const reactionsSchema = new Schema({
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Schema.Types.ObjectId()
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
    }

});

module.exports = reactionsSchema;