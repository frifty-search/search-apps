import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';

const AgeCalculatorExcel: React.FC = () => {
  return (
    <Stack spacing={3} mx={2} my={5}>
      <Typography variant="h5">Calculate age in Excel with DATEDIF</Typography>
      <Box
        component={'div'}
        sx={{
          p: 2,
          border: '1px dashed white',
          justifyContent: 'space-around',
        }}
      >
        DATEDIF(start_date, TODAY(), "y")
        <Button
          onClick={() => {
            navigator.clipboard.writeText('DATEDIF(start_date, TODAY(), "y")');
          }}
        >
          Copy to ClipBoard
        </Button>
      </Box>
      <img
        src="https://i.imgur.com/4AE0inO_d.webp?maxwidth=760&fidelity=grand"
        width={'100%'}
      />
    </Stack>
  );
};

export default AgeCalculatorExcel;
