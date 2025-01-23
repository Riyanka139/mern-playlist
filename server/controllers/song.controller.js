const { default: axios } = require("axios");
const Song = require("../model/song.model");

class SongController {
  async fethSong(req, res) {
    const { spotify_id } = req.body;
    try {
      const response = await axios.get(
        `${process.env.SPOTIFY_API_URL}/tracks/${spotify_id}`,
        {
          headers: {
            Authorization: `Bearer ${spotifyAccessToken}`,
          },
        }
      );

      const track = response.data;
      const song = new Song({
        spotify_id: track.id,
        title: track.name,
        artist: track.artists.map((artist) => artist.name).join(", "),
        album: track.album.name,
        duration: track.duration_ms,
      });

      await song.save();
      res.status(201).json(song);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error fetching song from Spotify", error });
    }
  }

  async getAll(req, res) {
    try {
      const songs = await Song.find();
      res.status(200).json({ data: songs });
    } catch (error) {
      res.status(500).json({message: 'Failed to get songs',error:err});
    }
  }

  async update(req, res) {
    try {
      const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json({ data: song });
    } catch (error) {
      res.status(500).json({message: 'Failed to update song',error:err});
    }
  }

  async delete(req, res) {
    try {
      await Song.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Song deleted" });
    } catch (error) {
      res.status(500).json({message: 'Failed to delete song',error:err});
    }
  }
}

module.exports = new SongController();
