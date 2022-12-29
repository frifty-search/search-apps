import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DropzoneArea } from 'mui-file-dropzone';
import imageCompression from 'browser-image-compression';
import { saveAs } from 'file-saver';

type ResizeOutput = 'JPEG' | 'PNG' | 'JPG' | '';

const PhotoSizeReducer: React.FC = () => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [error, setError] = React.useState('');
  const [maxSize, setMaxSize] = useState<number>(0);
  const [loading, setLoading] = useState<number | null>(null);
  const [outputFormat, setOutputFormat] = useState<ResizeOutput>('');
  const [sizeType, setSizeType] = useState<'KB' | 'MB'>('MB');

  const handleDrop = (files: File[]) => {
    setFiles(files);
    const [file] = files;
    if (file) {
      const fileSize = file.size / 1024;
      setMaxSize(Math.round(fileSize));
    }
  };

  const handleClick = async () => {
    // Resize image

    setError('');

    if (files.length === 0) {
      setError('Please select a file');
      return;
    }

    const [file] = files;
    if (!file) {
      setError('Please select a file');
      return;
    }

    if (outputFormat === '') {
      setError('Please select output format');
      return;
    }

    if (maxSize === 0) {
      setError('Please provide maximum size');
      return;
    }

    console.log(maxSize / 1024);

    setLoading(0);
    imageCompression(file, {
      maxSizeMB: maxSize / 1024,
      useWebWorker: true,
      onProgress: (progress) => {
        setLoading(progress);
      },
      fileType: `image/${outputFormat.toLowerCase()}`,
    })
      .then((compressedFile) => {
        saveAs(compressedFile, `compressed.${outputFormat.toLowerCase()}`);
        setLoading(null);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
        setLoading(null);
      });
  };

  return (
    <Stack spacing={3} mx={2} my={5}>
      <DropzoneArea
        acceptedFiles={['image/png', 'image/jpeg', 'image/jpg']}
        filesLimit={1}
        fileObjects={files}
        dropzoneText="Click to upload"
        onChange={handleDrop}
        showPreviewsInDropzone
        showFileNamesInPreview
        onDropRejected={() => {
          setError('Please select a valid image');
        }}
      />
      <Stack spacing={3} direction="row">
        <TextField
          label="Size Limit *"
          onChange={(e) => setMaxSize(+e.target.value)}
          value={maxSize}
          helperText="Maximum permissible size"
          type="number"
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">KB</InputAdornment>,
          }}
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Output Format</InputLabel>
          <Select
            labelId={'demo-simple-select-label'}
            id={'demo-simple-select'}
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value as ResizeOutput)}
            label={'Output Format'}
          >
            <MenuItem value={'PNG'}>PNG</MenuItem>
            <MenuItem value={'JPEG'}>JPEG</MenuItem>
            <MenuItem value={'JPG'}>JPG</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      {loading ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" value={loading} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
              loading
            )}%`}</Typography>
          </Box>
        </Box>
      ) : (
        <Button variant="outlined" onClick={handleClick}>
          Compress & Download Image
        </Button>
      )}
      <Typography variant="subtitle2">
        *In case an image can't be compressed below the size limit, we will
        compress it to the smallest size possible.
      </Typography>

      {error.length !== 0 && (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      )}
      {}
    </Stack>
  );
};

export default PhotoSizeReducer;
