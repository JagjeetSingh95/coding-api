const mongoose = require('mongoose');

const codeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    tag: { type: String, required: true },
    language: { type: String, required: true },
    description: { type: String, required: false },
    category: { type: String, required: false },
    design: { type: String, required: false },
    html: { type: String, required: false },
    css: { type: String, required: false },
    script: { type: String, required: false },
    image: { type: String, required: false },
    link: { type: String, required: false }
});

module.exports = mongoose.model('Code', codeSchema); 