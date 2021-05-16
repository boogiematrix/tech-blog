//post delete and put
const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Post } = require('../../models');

router.post('/', withAuth, async (req, res) => {
    try {
        console.log('here')
        const newPost = await Post.create({
            content: req.body.body,
            user_id: req.session.userId,
            title: req.body.title,
            createdAt: req.session.createdAt
        })
        res.json(newPost)
    } catch (err) {
        res.json(err)
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update({
            title: req.body.title,
            content: req.body.body,
        },
            {
                where: {
                id: req.params.id
            }
            })
        res.json(updatedPost)
    } catch (err) {
        res.json(err)
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    try {
        Post.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(204).send('Post deleted')
    } catch (err) {
        res.json(err)
    }
})

module.exports = router;
