import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { playlist } from "src/types";

const CreatePlaylist: React.FC<{
  open: boolean;
  handleClose: () => void;
  handleSave: (data: playlist) => void;
  isEdit: boolean;
  playlist: playlist | null;
}> = ({ open, handleClose, handleSave, isEdit, playlist }) => {
  const [newPlaylist, setNewPlaylist] = useState<playlist>({
    name: "",
    isPublic: false,
    songs: [],
  });

  useEffect(() => {
    if (isEdit && playlist) {
      setNewPlaylist(playlist);
    }
  }, [isEdit, playlist]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPlaylist({ ...newPlaylist, [name]: value });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? "Edit" : "Create New"} Playlist</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label="Playlist Name"
          margin="dense"
          type="text"
          fullWidth
          name="name"
          value={newPlaylist.name}
          onChange={handleInputChange}
          className="!mb-4"
        />
        {isEdit && (
                  <Autocomplete
                      className="mb-4"
            multiple
            options={playlist?.songs}
            getOptionLabel={(option) => option.title}
            value={newPlaylist.songs}
            onChange={(e, value) =>
              setNewPlaylist({ ...newPlaylist, songs: value })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Select Songs"
                placeholder="Songs"
              />
            )}
          />
        )}
        <FormControlLabel
          control={
            <Switch
              checked={newPlaylist.isPublic}
              onChange={(e) =>
                setNewPlaylist({ ...newPlaylist, isPublic: e.target.checked })
              }
              name="isPublic"
              color="primary"
            />
          }
          label="Public"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={() => handleSave(newPlaylist)} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePlaylist;
