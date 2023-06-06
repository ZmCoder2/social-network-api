const User = require('../models/user');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).select('-__v');

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUserId(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId},
                { $set: req.id },
                {runValidators: true, new: true}
            );

            if (!user) {
                res.status(404).json({ message: 'No users with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUserById(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'User does not exist'});
            }

            res.json({ message: 'User sucessfully deleted'});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
   
    async addFriend(req, res) {
        try {
          const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body.ObjectId } },
            // { runValidators: true, new: true }
          );
      
          if (userData) {
            res.status(200).json(userData);
          } else {
            res.status(404).json({ message: 'No user or friend found with ID' });
          }
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
      
          
}