const express = require("express");
const playlistController = require("../controllers/playlist.controller");
const songController = require("../controllers/song.controller");
const userController = require("../controllers/user.controller");
const authenticateToken = require("../middleware/auth");

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
router.delete("/playlist/:id", authenticateToken, playlistController.delete);

module.exports = router;
