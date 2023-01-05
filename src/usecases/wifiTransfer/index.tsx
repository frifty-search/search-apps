import { Stack, Typography } from '@mui/material';
import React from 'react';

const WifiTransfer: React.FC = () => {
  const qrValue = 'https://snapdrop.net';
  return (
    <Stack spacing={3} mx={2} my={5}>
      <Typography variant="h5" color="textPrimary">
        WiFi File Transfer
      </Typography>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <Typography variant="body1" color="textSecondary">
          Keep all devices connected to the same wifi network. Scan the QR code
          on the right.
        </Typography>
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?data=${qrValue}&size=200x200`}
          width="100px"
          height="100px"
          alt="QR Code"
        />
      </Stack>
      <iframe
        width="100%"
        height="500px"
        src="https://snapdrop.net/"
        title="Snapdrop"
      />
    </Stack>
  );
};

export default WifiTransfer;
