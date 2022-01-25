const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Post Tablosu(Şeması)
const PostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    content: {type: String, required: true},
    date: {type: Date, default: Date.now},
    category: {type: Schema.Types.ObjectId, ref: 'categories'},
    postImage: {type: String, required: true},
})

module.exports = mongoose.model('Post', PostSchema);