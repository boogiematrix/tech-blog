const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, Comment, User} = require('../models/')

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
            subQuery: false,
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
        const postData = await Post.findByPk(req.params.id, {
            include: [User, Comment],
            subQuery: false,
        });

        if (postData) {
            const post = postData.get({ plain: true });
console.log(post)
            res.render('onepost', {
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

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
            where: {
                user_id: req.session.userId,
            }, 
            subQuery: false,
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