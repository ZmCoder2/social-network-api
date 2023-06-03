const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
} = require('../../controllers/thoughtsController');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(singleUser);

module.exports = router;