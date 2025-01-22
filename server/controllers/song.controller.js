const { default: axios } = require("axios");
const Song = require("../model/song.model");

class SongController{
    async fethSong(req, res) {
        const { spotify_id } = req.body;
        try {
            const response = await axios.get(`${process.env.SPOTIFY_API_URL}/tracks/${spotify_id}`, {
                headers: {
                    Authorization: `Bearer ${spotifyAccessToken}`,
                },
            });
    
            const track = response.data;
            const song = new Song({
                spotify_id: track.id,
                title: track.name,
                artist: track.artists.map((artist) => artist.name).join(', '),
                album: track.album.name,
                duration: track.duration_ms,
            });
    
            await song.save();
            res.status(201).json({data:song});
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error fetching song from Spotify' });
        }
    }

    async getAll(req, res) {
        const songs = await Song.find();
        res.status(200).json({data:songs});
    }

    async update(req, res) {
        const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({data:song});

    }

    async delete(req, res) {
        await Song.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Song deleted' });
    }
}

module.exports = new SongController();