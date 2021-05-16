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
        const post = postData.map((post) => post.get({ plain: true }));
        res.render('fullblog', {
            post,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    };

});

router.get('/posts/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const postData = await Post.findByPK(req.params.id, {
            include: [User]
        });
        if (!postData) {
            res.status(404).json({ message: 'No post with that id' });
            return;
        }
        const post = postData.get({ plain: true });
        res.render('onepost', {
            post,
            loggedIn: req.session.loggedIn,
        })
    } catch (err) {

    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.userId,
            }, 
            include: [User]
        });
        if (!postData) {
            res.status(404).json();
            return;
        }
        const post = postData.map((post) => post.get({ plain: true }));
        res.render('dashboard', {
            post,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.render('dashboard', {
            loggedIn: req.session.loggedIn,
        })
    } else {
        res.render('login')
    }
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.render('dashboard', {
            loggedIn: req.session.loggedIn,
        });
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
                loggedIn: req.session.loggedIn,
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.redirect('login');
    }
});

router.get('/newpost', withAuth, (req, res) => {
    res.render('newpost', {
        loggedIn: req.session.loggedIn,
    });
    return;
})

module.exports = router;