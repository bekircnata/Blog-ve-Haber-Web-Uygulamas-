const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Post Tablosu(Şeması)
const NewsSchema = new mongoose.Schema({
    key: {type: String},
    url: {type: String},
    description: {type: String},
    image: {type: String},
    name: {type: String},
    source: {type: String},
})

module.exports = mongoose.model('News', NewsSchema);