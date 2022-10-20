import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const UnicornDefn: React.FC<{
  data: string;
}> = ({ data }: { data: string }) => {
  return (
    <Box sx={{ width: 1, backgroundColor: 'background.main' }}>
      <Stack
        spacing={2}
        alignItems="left"
        sx={{
          m: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
            textAlign: 'left',
          }}
        >
          Unicorn
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: 'justify',
            color: 'text.primary',
          }}
        >
          {data}
        </Typography>
      </Stack>
    </Box>
  );
};

export default UnicornDefn;
