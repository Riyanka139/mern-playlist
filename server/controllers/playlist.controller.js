const Playlist = require("../model/playlist.model");

class PlaylistController{
    async create (req, res) {
        const { name, description, songs, isPublic } = req.body;
        try {
            const newPlaylist = new Playlist({ name, description, songs, owner:req.user._id, isPublic });
            const savedPlaylist = await newPlaylist.save();
            res.status(201).json({data:savedPlaylist});
        } catch (err) {
            res.status(500).json({ error: 'Failed to create playlist' });
        }
    }

    async userPlaylist (req, res) {
        const { owner } = req.user._id;
        try {
            const playlists = await Playlist.find({ owner });
            res.json(playlists);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch playlists' });
        }
    }

    async sharePlaylist(req, res) {
        const { id } = req.params;
        try {
            const playlist = await Playlist.findById(id);
            if (!playlist.isPublic) {
                return res.status(403).json({ error: 'Playlist is not public' });
            }
            res.json(playlist);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch playlist' });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            await Playlist.findByIdAndDelete(id);
            res.json({ message: 'Playlist deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Failed to delete playlist' });
        }
    }
}

module.exports = new PlaylistController();