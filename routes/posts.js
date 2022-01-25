// POST ROUTE İŞLEMLERİ

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const path = require('path');
const Category = require('../models/Category');
const User = require('../models/User');

// Router

router.get('/new', (req, res) => {
    if(!req.session.userId){
        res.redirect('users/login');
    }else {
        Category.find({}).then((categories) => {
            res.render('pages/addpost', {categories: categories});
        })
    }
    
});

function escapeRegex(text) {
    return text.replace('/[-[\]{}()*+?.,\\^$|#\s/g', "\\$&");
}

// Search İşlemleri
router.get('/search', (req, res) => {
    if(req.query.look) {
        const regex = new RegExp(escapeRegex(req.query.look), 'gi');
        Post.find({"title": regex}).populate({path: 'author', model: User}).sort({$natural: -1}).then(posts => {
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
            ]).then( (categories) => {
            res.render('pages/blog', {posts: posts, categories: categories})
            })
        });
    }
});

// Kategori Çekme
router.get('/category/:categoryId', (req, res) => {
    Post.find({category:req.params.categoryId}).populate({path:'category', model: Category}).populate({path: 'author', model: User}).then( (posts) => {
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
        ]).then( (categories) => {
            res.render('pages/blog', {posts: posts, categories: categories})
        })
    })
})

// Post Çekme
router.get('/:id', (req,res) => {
    Post.findById(req.params.id).populate({path: 'author', model: User})
        .then((post) => {
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
            ]).then((categories) => {
                Post.find({}).populate({path: 'author', model: User}).sort({$natural: -1}).then(posts => {
                    res.render('pages/post', {post: post, categories: categories, posts: posts});
                })
                
            })
        })
});

// Form action = /post/test olduğu için form submit olduğunda otomatik olarak post/test url'ine gidiyoruz o zaman req.body ile içeriği çekiyoruz.
router.post('/test', (req, res) => {

    let postImage = req.files.postImage;
    // Seçtiğimiz resim dosyasını postimages klasörüne kopyalıyor
    postImage.mv(path.resolve(__dirname, '../public/img/postimages', postImage.name));
    // Formdan dönen veriyi db'ye kaydediyor.
    Post.create({
        ...req.body,
        postImage: `/img/postimages/${postImage.name}`,
        author: req.session.userId
    }, );
    req.session.sessionFlash = {
        type: 'alert alert-success',
        message: 'Postunuz başarılı bir şekilde oluşturuldu'
    }
    res.redirect('/blog');
});


module.exports = router;