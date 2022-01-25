// MAİN ROUTE İŞLEMLERİ

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Category = require('../models/Category');
const User = require('../models/User');
const News = require("../models/News");

// Router
router.get('/', (req, res) => {
    console.log(req.session);
    res.render('pages/blog');
});

router.get('/admin', (req, res) => {
    res.render('admin/posts');
});

// Anasayfa Blogların Listelenmesi
router.get('/blog', (req, res) => {

    // Sayfalama
    const postPerPage = 6
    const page = req.query.page || 1
    
    // Post Çekme
    Post.find({}).populate({path: 'author', model: User}).sort({$natural: -1})
    .skip((postPerPage * page) - postPerPage)
    .limit(postPerPage)
    .then(posts => {

        Post.countDocuments().then( (postCount) => {
            Category.aggregate([
                {
                    $lookup: {
                        from: 'posts',
                        localField: '_id',
                        foreignField: 'category',
                        as: 'posts'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        num_of_posts: {$size: '$posts'}
                    }
                }
            ])
            .then((categories) => {
                res.render('pages/blog', {
                    posts: posts, 
                    categories: categories,
                    current: parseInt(page),
                    pages: Math.ceil(postCount/postPerPage)
                });
            })
        })
            
    })
});

router.get('/contact', (req, res) => {
    res.render('pages/contact');
});

router.get('/blog-single', (req, res) => {
    res.render('pages/blog-single');
});

// Haberler Sayfasında Haberlerin Listelenmesi
router.get('/news', (req, res) => {
    // Sayfalama
    const postPerPage = 6
    const page = req.query.page || 1

    News.find({}).sort({$natural: -1})
    .skip((postPerPage * page) - postPerPage)
    .limit(postPerPage)
    .then(news => {

        News.countDocuments().then( (postCount) => {
            Category.aggregate([
                {
                    $lookup: {
                        from: 'news',
                        localField: '_id',
                        foreignField: 'category',
                        as: 'news'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        num_of_posts: {$size: '$news'}
                    }
                }
            ])
            .then((categories) => {
                res.render('pages/news', {
                    news: news, 
                    categories: categories,
                    current: parseInt(page),
                    pages: Math.ceil(postCount/postPerPage)
                });
            })
        })
            
    })
});



module.exports = router;