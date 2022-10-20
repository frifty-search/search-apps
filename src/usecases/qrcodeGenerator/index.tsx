import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Snackbar,
  Stack,
  TextField,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { saveAs } from 'file-saver';
import { copyImageToClipboard } from 'copy-image-clipboard';

// import QRCode from "react-qr-code";

const QrcodeGenerator: React.FC = () => {
  const [value, setValue] = useState<string | null>(null);
  const [qrValue, setQrValue] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <Close fontSize="small" />
    </IconButton>
  );

  return (
    <Stack spacing={3} mx={2} my={5}>
      <TextField
        label="Enter text to generate QR code"
        variant="outlined"
        value={value ?? ''}
        onChange={handleChange}
        fullWidth
      />
      <Button
        variant="outlined"
        onClick={() => setQrValue(encodeURI(value ?? ''))}
      >
        Generate QR Code
      </Button>
      {qrValue && (
        <Stack>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${qrValue}&size=200x200`}
              alt="QR Code"
            />
          </Box>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            paddingX={6}
            paddingY={1}
          >
            <Button
              variant="outlined"
              onClick={() => {
                saveAs(
                  `https://api.qrserver.com/v1/create-qr-code/?data=${qrValue}&size=200x200`,
                  'qrcode.png'
                );
              }}
            >
              Download QR Code
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                copyImageToClipboard(
                  `https://api.qrserver.com/v1/create-qr-code/?data=${qrValue}&size=200x200`
                )
                  .then(() => {
                    setOpen(true);
                  })
                  .catch((e) => {
                    console.log('Error: ', e.message);
                  });
              }}
            >
              Copy QR Code to Clipboard
            </Button>
          </Box>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message="Copied to clipboard"
            action={action}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default QrcodeGenerator;
