const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThoughtById,
    createNewThought,
    updateThoughtById,
    deleteThoughtById,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtsController');

router.route('/').get(getAllThoughts).post(createNewThought);
router.route('/:id').get(getSingleThoughtById).put(updateThoughtById).delete(deleteThoughtById);
router.route('/:id/reactions').post(createReaction);
router.route('/:id/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
