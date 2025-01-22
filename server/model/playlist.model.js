const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: String,
    description: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    isPublic: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },

}, { timestamps: true });

module.exports = mongoose.model('Playlist', playlistSchema);
