import { Add, SearchRounded } from "@mui/icons-material";
import {
  Button,
  Card,
  Grid,
  Typography
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { enviroment } from "src/enviroment";

const Dashboard: React.FC = () => {
  const [playlists, setPlaylists] = useState<string[]>([
    "Chill Hits",
    "Workout",
  ]);
  const [newPlaylist, setNewPlaylist] = useState("");

  useEffect(() => {
    axios
      .get(`${enviroment.baseURL}/playlist`)
      .then((res) => {
        console.log(res, "res");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);

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
      <div className="flex justify-between items-center">
        <Typography variant="h4" gutterBottom>
          Your Playlists
        </Typography>
        <div>
          <Button variant="contained" color="primary" className="!mr-3" startIcon={<SearchRounded />}>
            Search
          </Button>
          <Button variant="contained" color="success" startIcon={<Add />} onClick={addPlaylist}>
            Add
          </Button>
        </div>
      </div>
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
      
    </div>
  );
};
export default Dashboard;
