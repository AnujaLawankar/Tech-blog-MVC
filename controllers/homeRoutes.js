const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');
const router = require('express').Router();
router.get('/', (req, res) => {
    Blog.findAll({
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
        }
        ]
    })
        .then(dbBlogData => {
            const blogs = dbBlogData.map(blog => blog.get({ plain: true }));
            res.render('homepage', { blogs, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
// router.get('/', async (req, res) => {
//     try {
//         const blogtData = await Blog.findAll({
//             include: [User],
//         });

//         const posts = postData.map((post) => post.get({ plain: true }));

//         res.render('all-posts', { posts });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/blog/:id', (req, res) => {
    Blog.findOne({
        where: {
            id: req.params.id
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
        }
        ]
    })
        .then(dbBlogData => {
            if (!dbBlogData) {
                res.status(404).json({ message: 'No blog found with this id' });
                return;
            }
            const blog = dbBlogData.get({ plain: true });
            console.log(blog);
            res.render('single-blog', { blog, loggedIn: req.session.loggedIn });


        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.get('/blogs-comments', (req, res) => {
    Blog.findOne({
        where: {
            id: req.params.id
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
        }
        ]
    })
        .then(dbBlogData => {
            if (!dbBlogData) {
                res.status(404).json({ message: 'No comments found with this blog' });
                return;
            }
            const blog = dbBlogData.get({ plain: true });

            res.render('blogs-comments', { blog, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// router.get('/post/:id', async (req, res) => {
//     try {
//         const postData = await Post.findByPk(req.params.id, {
//             include: [
//                 User,
//                 {
//                     model: Comment,
//                     include: [User],
//                 },
//             ],
//         });
//         if (postData) {
//             const post = postData.get({ plain: true });

//             res.render('single-post', { post });
//         } else {
//             res.status(404).end();
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });


module.exports = router;