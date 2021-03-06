//post and delete
const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');

router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            content: req.body.body,
            user_id: req.session.userId,
            post_id: req.body.postId,
        })
        res.json(newComment)
    } catch (err) {
        res.json(err)
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    try {
        Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(204).send('Comment deleted')
    } catch (err) {
        res.json(err)
    }
})

module.exports = router;