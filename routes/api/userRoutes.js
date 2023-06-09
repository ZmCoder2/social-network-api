const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUserId,
    deleteUserById,
    addFriend,
    deleteFriend
    
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUserId).delete(deleteUserById);

// router.route('/:userId/friends').post(addFriend);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;