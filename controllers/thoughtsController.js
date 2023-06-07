const { Thoughts, Users } = require('../models');

module.exports = {
    // Gets all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find()
                .populate({ path: 'reactions', select: '-__v' });

            res.json(thoughts);
        } catch (err) {
            console.error({ message: err });
            res.status(500).json(err);
        }
    },

    // Get a single thought by its ID
    async getSingleThoughtById(req, res) {
        try {
            const thought = await Thoughts.findOne(
                { _id: req.params.thoughtsId })
                .populate({ path: 'reactions', select: '-__v' });

            if (!thought) {
                return res.status(404).json({ message: 'No thoughts with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a new thought
    async createNewThought(req, res) {
        try {
            const thought = await Thoughts.create(req.body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Delete a Thought by ID
    async deleteThoughtById(req, res) {
        try {
            const thought = await Thoughts.findOneAndDelete({ _id: req.params.thoughtsId });

            if (!thought) {
                res.status(404).json({ message: 'No thoughts with that ID' });
            } else {
                res.json({ message: 'Thought deleted successfully' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update a thought
    async updateThoughtById(req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thoughts with that ID' });
            } else {
                res.json(thought);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a reaction
    async  createReaction(req, res) {
        try {
          const { reactionBody, username } = req.body;
      
          if (!reactionBody || !username) {
            return res.status(400).json({ error: 'Reaction body and username are required.' });
          }
      
          const reaction = {
            reactionId: new mongoose.Types.ObjectId(),
            reactionBody,
            username,
            createdAt: new Date(),
          };
      
          const thought = new Thoughts({
            thoughtText: req.body.thoughtText,
            username: req.body.username,
            reactions: [reaction], // Pass the reaction as an array of embedded objects
          });
      
          await thought.save();
      
          res.json(reaction);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },
      

    // Delete a reaction
    async deleteReaction(req, res) {
        try {
            const reaction = await Thoughts.findOneAndDelete({ _id: req.params.reactionId });

            if (!reaction) {
                res.status(404).json({ message: 'No reaction with that ID' });
            } else {
                res.json({ message: 'Reaction deleted successfully' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

// module.exports = thoughtsController;