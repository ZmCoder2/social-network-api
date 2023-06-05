// Maybe Users?
const { Thoughts } = require('../models');

module.exports = {
    // Gets all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find()
            .populate({ path: 'reactions', select: '-__v'});

            res.json(thoughts);
        } catch (err) {
            console.error({ message: err });
            res.status(500).json(err);
        }
    },
    
    // Get a single thought by its ID
    async getSingleThoughtById(req, res) {
        try {
            const thought = await Thoughts.findOne({ _id: req.params.thoughtsId })
            .populate({ path: 'reactions', select: '-__v'});

            if (thought) {
                return res.status(404).json({ message: 'No thoughts with that ID'});
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    // Create a new thought
    async createNewThought(req, res) {
        try {
            const thoughts = await Post.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thoughts._id } },
                { new: true }
            );

            if (!user) {
                return res
                .status(404)
                .json({ message: 'Post created, but no user with that ID' })
            }
            
            res.json('Created Post!');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Create a Thought
    async createNewThought(req, res) {
        try {
            const thoughts = await Thoughts.create(req.body);
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Delete a Thought by ID
    async deleteThoughtById(req, res) {
        try {
            const thoughts = await Thoughts.findOneAndDelete({ _id: req.params.thoughtsId });

            if (!thoughts) {
                res.status(404).json({ message: 'No thoughts with that ID'});
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update a thought
    async updateThoughtById(req, res) {
        try {
            const thoughts = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtsId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thoughts) {
                res.status(404).json({ message: 'No thoughts with that ID' });
            }

            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    // Create a reaction
    async createReaction(req, res) {
        try {
            const reaction = await Thoughts.create(req.body);
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
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

// module.exports = thoughtsController;