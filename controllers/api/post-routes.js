//post delete and put
const router = require('express').Router();
const withAuth = require('../../utils/auth');
const Post = require('../../models/Post');

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            content: req.body.content,
            user_id: req.session.userId,
            title: req.body.title,
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
            content: req.body.content,
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
