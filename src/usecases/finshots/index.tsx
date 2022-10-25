import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  ImageList,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getUsecaseDataFromServer } from '../../utils/api.utils';

type FinshotsResponse = {
  title: string;
  description: string;
  image: string;
  link: string;
  pubDate: string;
};

const Finshots: React.FC = () => {
  const [finshots, setFinshots] = useState<FinshotsResponse[]>([]);

  useEffect(() => {
    getUsecaseDataFromServer(38, {}).then((data) => {
      setFinshots(data as FinshotsResponse[]);
    });
  }, []);

  return (
    <Box>
      <Typography variant="h5" align="center">
        Finshots from Finshots by Frifty
      </Typography>
      <ImageList
        variant="quilted"
        cols={2}
        sx={{
          maxHeight: 450,
          overflowY: 'auto',
        }}
      >
        {finshots.map((finshot) => (
          <Card
            key={finshot.title}
            sx={{
              bgcolor: 'background.paper',
              cursor: 'pointer',
              mx: 1,
              my: 1,
            }}
            onClick={() => window.open(finshot.link, '_blank')}
          >
            <CardMedia
              component="img"
              height="140"
              image={finshot.image}
              alt={finshot.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {finshot.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {finshot.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {finshot.pubDate}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </ImageList>
    </Box>
  );
};

export default Finshots;
