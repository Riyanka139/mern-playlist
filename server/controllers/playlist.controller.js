const Playlist = require("../model/playlist.model");
const Song = require("../model/song.model");

class PlaylistController{
    async create (req, res) {
        const { name, songs, isPublic } = req.body;
        try {
            const newPlaylist = new Playlist({ name, songs, owner:req.user._id, isPublic });
            const savedPlaylist = await newPlaylist.save();
            res.status(201).json(savedPlaylist);
        } catch (err) {
            res.status(500).json({ message: 'Failed to create playlist', error:err });
        }
    }

    async userPlaylist (req, res) {
        const  owner  = req.user._id;
        try {
            const playlists = await Playlist.find({ owner }).populate('songs').populate('owner');
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
            const playlist = await Playlist.findById(id);
             // Check ownership
             if (!playlist || playlist.owner.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'You are not authorized to delete this playlist' });
            }
            await Playlist.findByIdAndDelete(id);
            res.status(200).json({ message: 'Playlist deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Failed to delete playlist', error:err });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const { name, songs, isPublic } = req.body;

        try {
            const playlist = await Playlist.findById(id);

            // Check ownership
            if (!playlist || playlist.owner.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'You are not authorized to update this playlist' });
            }

            // Update fields
            if (name) playlist.name = name;
            if (songs) playlist.songs = songs;
            if (isPublic !== undefined) playlist.isPublic = isPublic;

            const updatedPlaylist = await playlist.save();
            res.status(200).json(updatedPlaylist);
        } catch (err) {
            res.status(500).json({ message: 'Failed to update playlist', error: err });
        }
    }

    async updateSongs(req, res) {
        const { id } = req.params; 
        const { songs } = req.body; 

        try {
            const playlist = await Playlist.findById(id);

            // Check ownership
            if (!playlist || playlist.owner.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'You are not authorized to update this playlist' });
            }

            
            for (const songData of songs) {
                let song = await Song.findOne({ spotify_id: songData.spotifyId });

                // If the song doesn't exist, create a new one
                if (!song) {
                    song = new Song({
                        spotify_id: songData.spotifyId,
                        title: songData.title,
                        artist: songData.artist,
                        album: songData.album,
                        duration: songData.duration,
                    });
                    await song.save(); 
                }

                // Add the song to the playlist if it's not already there
                if (!playlist.songs.includes(song._id)) {
                    playlist.songs.push(song._id);
                }
            }

            const updatedPlaylist = await playlist.save();
            res.status(200).json(updatedPlaylist);
        } catch (err) {
            console.log(err);
            
            res.status(500).json({ message: 'Failed to update songs in playlist', error: err });
        }
    }
}

module.exports = new PlaylistController();