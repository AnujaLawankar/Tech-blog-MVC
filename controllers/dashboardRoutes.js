const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
router.get('/', withAuth, (req, res) => {
    Blog.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'description',
            'created_at'
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment', 'blog_id', 'user_id'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
        ]
    })
        .then(dbBlogData => {
            const blogs = dbBlogData.map(blog => blog.get({ plain: true }));
            res.render('dashboard', { blogs, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.get('/', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            where: {
                userId: req.session.userId,
            },
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render('all-posts-admin', {
            layout: 'dashboard',
            blogs,
        });
    } catch (err) {
        res.redirect('login');
    }
});

router.get('/edit/:id', withAuth, (req, res) => {
    Blog.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id',
            'title',
            'description',
            'created_at'
        ],
        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'comment', 'blog_id', 'user_id'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
        ]
    })
        .then(dbBlogData => {
            if (!dbBlogData) {
                res.status(404).json({ message: 'No blog found with this id' });
                return;
            }

            const blog = dbBlogData.get({ plain: true });
            res.render('edit-blog', { blog, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/new', (req, res) => {
    res.render('new-blog');



});


// router.post('/new', withAuth, (req, res) => {
//     res.render('new-blog');
//     Blog.create({
//         title: req.body.title,
//         description: req.body.description,
//         user_id: req.session.user_id,
//         created_at: req.session.created_at
//     })
//         .then(dbBlogData => res.json(dbBlogData))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });

// });

router.post('/new', withAuth, (req, res) => {
    Blog.create({
        title: req.body.title,
        description: req.body.description,
        user_id: req.session.user_id,
    })
        .then(dbBlogData => {
            // Optionally, you can redirect to a different page after successful creation
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;