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

const BarcodeGenerator: React.FC = () => {
  const [value, setValue] = useState<string | null>(null);
  const [barcodeValue, setBarcodeValue] = useState<string | null>(null);
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
        label="Enter text to generate barcode"
        variant="outlined"
        value={value ?? ''}
        onChange={handleChange}
      />
      <Button
        variant="outlined"
        onClick={() => setBarcodeValue(encodeURI(value ?? ' '))}
      >
        Generate Barcode
      </Button>
      {barcodeValue && (
        <Stack>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={`https://bwipjs-api.metafloor.com/?bcid=code128&text=${barcodeValue}&scale=3&includetext`}
              alt="barcode"
              style={{
                backgroundColor: 'white',
              }}
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
                  `https://bwipjs-api.metafloor.com/?bcid=code128&text=${barcodeValue}&scale=3&includetext`,
                  'barcode.jpg'
                );
              }}
            >
              Download Barcode
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                copyImageToClipboard(
                  `https://bwipjs-api.metafloor.com/?bcid=code128&text=${barcodeValue}&scale=3&includetext`
                )
                  .then(() => {
                    setOpen(true);
                  })
                  .catch((e) => {
                    console.log('Error: ', e.message);
                  });
              }}
            >
              Copy Barcode to Clipboard
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

export default BarcodeGenerator;
