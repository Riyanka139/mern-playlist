import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Dashboard: React.FC = () => {
    const [playlists, setPlaylists] = useState<string[]>(["Chill Hits", "Workout"]);
    const [newPlaylist, setNewPlaylist] = useState("");
  
    const addPlaylist = () => {
      if (newPlaylist) {
        setPlaylists([...playlists, newPlaylist]);
        setNewPlaylist("");
      }
    };
  
    const deletePlaylist = (index: number) => {
      setPlaylists(playlists.filter((_, i) => i !== index));
    };
  
    return (
      <div className="p-4">
        <Typography variant="h4" gutterBottom>
          Your Playlists
        </Typography>
        <Grid container spacing={2} className="my-4">
          {playlists.map((playlist, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="p-4 flex justify-between items-center">
                <Typography>{playlist}</Typography>
                <Button color="secondary" onClick={() => deletePlaylist(index)}>
                  Delete
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div className="flex gap-4 my-4">
          <TextField
            label="New Playlist"
            value={newPlaylist}
            onChange={(e) => setNewPlaylist(e.target.value)}
            variant="outlined"
          />
          <Button variant="contained" color="primary" onClick={addPlaylist}>
            Add
          </Button>
        </div>
      </div>
    );
};
export default Dashboard;