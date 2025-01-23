import { AddCircleOutline, SearchRounded } from "@mui/icons-material";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { enviroment } from "src/enviroment";
import { playlist } from "src/types";

const SearchPopup: React.FC<{
  open: boolean;
    handleClose: () => void;
    playlists: playlist[];
    addToPlaylist: (playlistId: string, song: any) => void; 
}> = ({ open, handleClose, playlists,addToPlaylist }) => {
  const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSong, setSelectedSong] = useState<any | null>(null);


  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `${enviroment.baseURL}/spotify/song?query=${searchQuery}`
      );
      setSuggestions(res.data);
    } catch (error) {
      console.error("Error fetching song suggestions", error);
    }
    };
    
    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, song: any) => {
        setAnchorEl(event.currentTarget);
        setSelectedSong(song);
      };
    
      const handleCloseMenu = () => {
        setAnchorEl(null);
        setSelectedSong(null);
      };
    
      const handleAddToPlaylist = (playlistId: string) => {
        if (selectedSong) {
          addToPlaylist(playlistId, selectedSong);
        }
        handleCloseMenu();
      };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Search Songs</DialogTitle>
      <DialogContent>
        <div className="flex items-center gap-x-4">
          <TextField
            autoFocus
            margin="dense"
            label="Search Songs"
            type="text"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            <SearchRounded />
          </Button>
        </div>
        <List className="mt-4">
          {suggestions.map((song, index) => (
            <>
              <ListItem key={index}>
                <ListItemText
                  primary={
                    <div>
                      <Typography variant="subtitle1">{song.title}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {song.artist} - {song.album}
                      </Typography>
                    </div>
                  }
                  secondary={
                    <Typography variant="body2" color="textSecondary">
                      Duration: {Math.floor(song.duration / 60000)}:
                      {((song.duration % 60000) / 1000)
                        .toFixed(0)
                        .padStart(2, "0")}{" "}
                      minutes
                    </Typography>
                  }
                      />
                      <IconButton
                  color="primary"
                  onClick={(e) => handleOpenMenu(e, song)}
                >
                  <AddCircleOutline />
                </IconButton>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Close
        </Button>
          </DialogActions>
          <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {playlists.map((playlist) => (
          <MenuItem
            key={playlist._id}
            onClick={() => handleAddToPlaylist(playlist._id!)}
          >
            {playlist.name}
          </MenuItem>
        ))}
      </Menu>
    </Dialog>
  );
};

export default SearchPopup;
