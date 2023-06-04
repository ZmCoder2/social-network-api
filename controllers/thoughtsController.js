const { Thoughts } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find()
            .populate({ path: 'thoughts', select: '-__v'});

            res.json(thoughts);
        } catch (err) {
            console.error({ message: err });
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thoughts.findOne({ _id: req.params.postId })
            .populate({ path: 'tags', select: '-__v'});

            if (thought) {
                return res.status(404).json({ message: 'No thoughts with that ID'});
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};