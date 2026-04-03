
const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    
    title: {type: String, required: true},
    content: {type: String, required: true},
    visibility: {type: Boolean, default: false},
    photos: [{fileURL: {type: String}, caption: {type: String}}],
    location: {name: {type: String}, country: {type: String}},
    tags: [{type: String}],
    user: {type: mongoose.Schema.Types.ObjectID, ref: 'User', required: true}



},

{timestamps: true}
);

module.exports = mongoose.model('Journal', journalSchema);