const express = require("express");
const playlistController = require("../controllers/playlist.controller");
const songController = require("../controllers/song.controller");
const userController = require("../controllers/user.controller");
const authenticateToken = require("../middleware/auth");
const spotifyController = require("../controllers/spotify.controller");

const router = express.Router();

router.post("/login", userController.login);
router.post("/register", userController.register);

router.get("/songs", authenticateToken, songController.getAll);
router.post("/songs/spotify", authenticateToken, songController.fethSong);
router.patch("/songs/:id", authenticateToken, songController.update);
router.delete("/songs/:id", authenticateToken, songController.delete);

router.post("/playlist", authenticateToken, playlistController.create);
router.get(
  "/playlist",
  authenticateToken,
  playlistController.userPlaylist
);
router.get(
  "/playlist/share/:id",
  authenticateToken,
  playlistController.sharePlaylist
);
router.patch("/playlist/song/:id", authenticateToken, playlistController.updateSongs);
router.patch("/playlist/:id", authenticateToken, playlistController.update);
router.delete("/playlist/:id", authenticateToken, playlistController.delete);

router.get("/spotify/song",authenticateToken, spotifyController.fetchTrack)

module.exports = router;
