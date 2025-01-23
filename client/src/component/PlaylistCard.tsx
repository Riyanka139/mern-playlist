import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { playlist } from "src/types";

const PlaylistCard: React.FC<{
  playlist: playlist;
  deletePlaylist: (id: string) => void;
  editPlaylist: (data: playlist) => void
}> = ({ playlist, deletePlaylist, editPlaylist }) => {
  
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className="flex justify-between items-center p-4">
        <CardContent>
          <Typography variant="h6" className="mb-2">
            {playlist.name}
          </Typography>
          
          <Typography variant="body2" className="mb-4">
            {playlist.isPublic ? "Public" : "Private"}
          </Typography>
          <Typography variant="body2">
            Songs: {playlist.songs.length}
          </Typography>
        </CardContent>
        <CardActions className="flex justify-end">
          <IconButton aria-label="Edit" onClick={() => editPlaylist(playlist)}>
            <EditIcon />
          </IconButton>

          <IconButton
            aria-label="Delete"
            onClick={() => deletePlaylist(playlist._id!)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PlaylistCard;
