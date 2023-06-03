const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUserId,
    deleteUserById,
    
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUserId).delete(deleteUserById);


module.exports = router;