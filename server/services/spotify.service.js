const axios = require('axios')
class SpotifyAPI{
    async getAccessToken() {
        try {
            const response = await axios.post('https://accounts.spotify.com/api/token', 
                new URLSearchParams({
                    grant_type: 'client_credentials',
                }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
                    },
                });
            return response.data.access_token;
        } catch (err) {
            console.error('Error fetching Spotify access token:', err);
            throw err;
        }
    }

    async searchTracks (query, token){
        try {
            const response = await axios.get('https://api.spotify.com/v1/search', {
                headers: { Authorization: `Bearer ${token}` },
                params: { q: query, type: 'track', limit: 10 },
            });
            return response.data.tracks.items;
        } catch (err) {
            console.error('Error searching tracks on Spotify:', err);
            throw err;
        }
    }
}

module.exports = new SpotifyAPI();