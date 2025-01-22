const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    spotify_id: String,
    title: String,
    artist: String,
    album: String,
    duration: Number, // duration in milliseconds
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Song', songSchema);
