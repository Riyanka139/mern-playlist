import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { playlist } from 'src/types';

const PlaylistCard: React.FC<{playlist:playlist}> = ({ playlist }) => {
  return (
    <Card sx={{ maxWidth: 300, marginBottom: '20px' }}>
      <CardContent>
        <Typography variant="h6">{playlist.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          Owner: {playlist.owner}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Privacy: {!playlist.isPublic}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Songs: {playlist.songs.join(', ')}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          View Playlist
        </Button>
      </CardActions>
    </Card>
  );
}

export default PlaylistCard;