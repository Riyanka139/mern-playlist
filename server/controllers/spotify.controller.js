const spotifyApi = require("../services/spotify.service");

class SpotifyAPIController{
    async fetchTrack(req, res){
        const { query } = req.query;
        try {
            log
            const token = await spotifyApi.getAccessToken();
            const tracks = await spotifyApi.searchTracks(query, token);
            res.json(tracks.map(track => ({
                spotifyId: track.id,
                title: track.name,
                artist: track.artists[0]?.name,
                album: track.album.name,
                duration: track.duration_ms,
            })));
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch tracks from Spotify', error:err });
        }
    }
}

module.exports = new SpotifyAPIController();