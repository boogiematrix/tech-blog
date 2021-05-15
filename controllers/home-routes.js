const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, Comment, User} = require('../models/')

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User]
        });
        
        if (!postData) {
            res.status(403).json();
            return;
        }
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('fullblog', { posts });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    };

});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPK(req.params.id);
        if (!postData) {
            res.status(404).json({ message: 'No post with that id' });
            return;
        }
        const post = postData.get({ plain: true });
        res.render('onepost', post)
    } catch (err) {

    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.userId,
            }
        });
        if (!postData) {
            res.status(404).json();
            return;
        }
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('dashboard', posts);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.render('dashboard')
    } else {
        res.render('login')
    }
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.render('dashboard');
    } else {
        res.render('signup')
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if (postData) {
            const post = postData.get({ plain: true });

            res.render('edit', {
                post,
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.redirect('login');
    }
});

router.get('/newpost', withAuth, (req, res) => {
    res.render('newpost');
    return;
})

module.exports = router;