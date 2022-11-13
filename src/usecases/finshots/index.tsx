import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getUsecaseDataFromServer } from '../../utils/api.utils';

type FinshotResponse = {
  title: string;
  date: string;
  image: string;
  content: string;
};

const Finshots: React.FC = () => {
  const [finshot, setFinshot] = useState<FinshotResponse | null>(null);

  useEffect(() => {
    getUsecaseDataFromServer(38, {}).then((data) => {
      setFinshot(data as FinshotResponse);
    });
  }, []);

  return !finshot ? null : (
    <Stack spacing={2} mx={2} my={5}>
      <Typography variant="h4" component="h1" gutterBottom>
        {finshot.title}
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        {finshot.date}
      </Typography>
      <img src={finshot.image} alt={finshot.title} />
      <div
        dangerouslySetInnerHTML={{ __html: finshot.content }}
        style={{
          maxHeight: '300px',
          overflowY: 'scroll',
        }}
      />
    </Stack>
  );
};

export default Finshots;
