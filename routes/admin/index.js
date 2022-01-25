const express = require('express');
const router = express.Router();
const path = require('path');
const expressSession = require('express-session');
const Post = require('../../models/Post');
const Category = require('../../models/Category');
const News = require('../../models/News');

// Router

router.get('/', (req, res) => {
    res.render('/admin/index');
});

// Kategorileri Çekme
router.get('/categories', (req, res) => {
    Category.find({}).sort({$natural: -1}).then(categories => {
        res.render('admin/categories', {categories: categories})
    })
});

// Kategori Ekleme
router.post('/categories', (req, res) => {
    Category.create(req.body, (error, category) => {
        if(!error) {
            res.redirect('categories');
        }
    });
});

// Kategori Silme
router.delete('/categories/:id', (req, res) => {
    Category.remove({_id : req.params.id}).then(() => {
        res.redirect('/admin/categories');
    });
});

// Post Çekme
router.get('/posts', (req, res) => {
    const {userId} = req.session
    Post.find({author: userId}).populate({path: 'category', model: Category}).sort({$natural: -1}).then(posts => {
            res.render('admin/posts', {posts: posts});
        })
});

// Post Silme
router.delete('/posts/:id', (req, res) => {

    Post.remove({_id : req.params.id}).then(() => {
        res.redirect('/admin/posts');
    });
});

// Post Edit
router.get('/posts/edit/:id', (req, res) => {
    const {userId} = req.session;
        Post.findOne({_id: req.params.id, author: userId}).then((post) => {
            Category.find({}).then((categories) => {
                res.render('admin/editpost', {post:post, categories:categories});
            })
        })
    
});

// Post Ekleme
router.put('/posts/:id', (req, res) => {
    let postImage = req.files.postImage;
    postImage.mv(path.resolve(__dirname, '../../public/img/postimages', postImage.name));

    Post.findOne({_id: req.params.id}).then( (post) => {
        post.title = req.body.title
        post.content = req.body.content
        post.date = req.body.date
        post.category = req.body.category
        post.post_image = `/img/postimages/${postImage.name}`

        post.save().then( (post) => {
            res.redirect('/admin/posts')
        })
    })
});

// Haber Çekme
router.get('/news', (req, res) => {
    News.find({}).sort({$natural: -1}).then(news => {
            res.render('admin/news', {news: news});
        })
});

// Haber Silme
router.delete('/news/:id', (req, res) => {

    News.remove({_id : req.params.id}).then(() => {
        res.redirect('/admin/news');
    });
});

module.exports = router;