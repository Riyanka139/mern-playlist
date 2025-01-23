import { Add, SearchRounded } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import CreatePlaylist from "src/component/CreatePlaylist";
import PlaylistCard from "src/component/PlaylistCard";
import SearchPopup from "src/component/SearchPopup";
import Toast from "src/component/Toast";
import { enviroment } from "src/enviroment";
import { playlist } from "src/types";

const Dashboard: React.FC = () => {
  const [playlists, setPlaylists] = useState<playlist[]>([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    type: "error" | "warning" | "info" | "success";
  }>({ open: false, message: "", type: "error" });
  const [isEdit, setIsEdit] = useState(false);
  const [editablePlaylist, setEditalblePlaylist] = useState<playlist | null>(
    null
  );
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    getPlaylist();
  }, []);

  const getPlaylist = async () => {
    try {
      const res = await axios.get(`${enviroment.baseURL}/playlist`);
      console.log(res, "res");
      setPlaylists(res.data);
    } catch (error) {
      console.error("Error  playlist", error);
      setToast({
        open: true,
        message: "Error to retriving playlist",
        type: "error",
      });
    }
  };

  const handleSave = async (data: playlist) => {
    try {
      let res;
      if (isEdit) {
        res = await axios.patch(
          `${enviroment.baseURL}/playlist/${data._id}`,
          data
        );
      } else {
        res = await axios.post(`${enviroment.baseURL}/playlist`, data);
      }

      console.log("Playlist created successfully", res);
      setToast({
        open: true,
        message: `Playlist ${isEdit ? "updated" : "created"} successfully`,
        type: "success",
      });
      handleClose();
      getPlaylist();
    } catch (error: any) {
      console.error("Error creating playlist", error);
      setToast({
        open: true,
        message:
          error.response?.data?.message ||
          `Error ${isEdit ? "updating" : "creating"} playlist`,
        type: "error",
      });
    }
  };

  const addToPlaylist = async (playlistId: string, song: any) => {
    try {
     await axios.patch(
        `${enviroment.baseURL}/playlist/song/${playlistId}`,
        {songs:[song]}
      );

      setToast({
        open: true,
        message: `Added ${song.title} to playlist `,
        type: "success",
      });
      setSearchOpen(false);
      getPlaylist();
    } catch (error:any) {
      setToast({
        open: true,
        message:
          error.response?.data?.message || "Failed to add song",
        type: "error",
      });
    }
  }

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setEditalblePlaylist(null);
  };

  const handleEdit = (data: playlist) => {
    console.log(data);

    setEditalblePlaylist(data);
    setIsEdit(true);
    setOpen(true);
  };

  const deletePlaylist = async (id: string) => {
    try {
      await axios.delete(`${enviroment.baseURL}/playlist/${id}`);
      setToast({
        open: true,
        message: `Playlist deleted successfully`,
        type: "success",
      });
      getPlaylist();
    } catch (error: any) {
      console.error("Error creating playlist", error);
      setToast({
        open: true,
        message: error.response?.data?.message || `Error deleting playlist`,
        type: "error",
      });
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <Typography variant="h4" gutterBottom>
          Your Playlists
        </Typography>
        <div>
          <Button
            variant="contained"
            color="primary"
            className="!mr-3"
            startIcon={<SearchRounded />}
            onClick={() => setSearchOpen(true)}
          >
            Search
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<Add />}
            onClick={() => {
              setOpen(true);
            }}
          >
            Add
          </Button>
        </div>
      </div>
      <Grid container spacing={2} className="my-4">
        {playlists.map((playlist, index) => (
          <PlaylistCard
            playlist={playlist}
            deletePlaylist={deletePlaylist}
            key={index}
            editPlaylist={handleEdit}
          />
        ))}
      </Grid>
      <CreatePlaylist
        open={open}
        handleClose={handleClose}
        handleSave={handleSave}
        isEdit={isEdit}
        playlist={editablePlaylist}
      />
      <SearchPopup open={ searchOpen} handleClose={() => setSearchOpen(false)} playlists={playlists} addToPlaylist={addToPlaylist} />
      <Toast
        toast={toast}
        handleCloseToast={() => setToast({ ...toast, open: false })}
      />
    </div>
  );
};
export default Dashboard;
