const Playlist = require("../model/playlist.model");

class PlaylistController{
    async create (req, res) {
        const { name, description, songs, isPublic } = req.body;
        try {
            const newPlaylist = new Playlist({ name, description, songs, owner:req.user._id, isPublic });
            const savedPlaylist = await newPlaylist.save();
            res.status(201).json(savedPlaylist);
        } catch (err) {
            res.status(500).json({ message: 'Failed to create playlist', error:err });
        }
    }

    async userPlaylist (req, res) {
        const { owner } = req.user._id;
        try {
            const playlists = await Playlist.find({ owner });
            res.status(200).json(playlists);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch playlists', error:err });
        }
    }

    async sharePlaylist(req, res) {
        const { id } = req.params;
        try {
            const playlist = await Playlist.findById(id);
            if (!playlist.isPublic) {
                return res.status(403).json({ error: 'Playlist is not public' });
            }
            res.status(200).json(playlist);
        } catch (err) {
            res.status(500).json({ error: 'Failed to share playlist', error:err });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            await Playlist.findByIdAndDelete(id);
            res.status(200).json({ message: 'Playlist deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Failed to delete playlist', error:err });
        }
    }
}

module.exports = new PlaylistController();