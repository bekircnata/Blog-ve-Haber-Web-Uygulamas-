const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/login', (req, res) => {
    res.render('pages/login');
});

// Login İşlemleri
router.post('/login', (req, res) => {
    const {email, password} = req.body;

    User.findOne({email}, (error, user) =>{
        if(user){
            if(user.password == password){
                req.session.userId = user._id;
                res.redirect('/blog');
            }else{ res.redirect('/users/login') }
        }else{ res.send('Sadece Adminler Giriş Yapabilir') }
    });

});

// Logout İşlemleri
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/blog');
    });
});
module.exports = router;