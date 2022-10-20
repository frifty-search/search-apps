import React, { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DropzoneArea } from 'mui-file-dropzone';
import { saveAs } from 'file-saver';

type ResizeOutput = 'JPEG' | 'PNG' | 'JPG' | '';

const PhotoResizer: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [quality, setQuality] = useState<number>(90);
  const [outputFormat, setOutputFormat] = useState<ResizeOutput>('');
  const [error, setError] = useState<string>('');

  const handleDrop = (files: File[]) => {
    setFiles(files);
  };

  const handleClick = () => {
    // Resize image

    const [file] = files;
    if (!file) {
      setError('Please select a file');
      return;
    }

    if (width === 0 || height === 0) {
      setError('Please select width and height');
      return;
    }

    if (outputFormat === '') {
      setError('Please select output format');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        const elem = document.createElement('canvas');
        elem.width = width;
        elem.height = height;
        const ctx = elem.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        ctx?.canvas.toBlob(
          (blob) => {
            saveAs(
              blob as Blob,
              `${
                file.name.split('.')[0]
              }-${width}x${height}.${outputFormat.toLowerCase()}`
            );
          },
          `image/${outputFormat.toLowerCase()}`,
          quality / 100
        );
        elem.remove();
      };
    };
  };

  return (
    <Stack spacing={3} mx={2} my={5}>
      <DropzoneArea
        acceptedFiles={['image/png', 'image/jpeg', 'image/jpg']}
        filesLimit={1}
        fileObjects={files}
        dropzoneText="Drag and drop a png file here or click"
        onChange={handleDrop}
        showPreviewsInDropzone
        showFileNamesInPreview
        onDropRejected={() => {
          alert('Only png files are accepted');
        }}
      />
      <Stack spacing={3} direction="row">
        <TextField
          label="Width"
          onChange={(e) => setWidth(+e.target.value)}
          value={width}
          fullWidth
        />
        <TextField
          label="Height"
          onChange={(e) => setHeight(+e.target.value)}
          value={height}
          fullWidth
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
      <Stack spacing={3} direction="row">
        <Slider
          aria-label="Picture Quality"
          defaultValue={quality}
          getAriaValueText={(value) => `${value}`}
          valueLabelDisplay="auto"
          step={10}
          marks
          min={10}
          max={100}
          onChange={(e, value) => setQuality(value as number)}
        />
      </Stack>
      <Button variant="outlined" onClick={handleClick}>
        Convert & Download to JPEG
      </Button>
      {error.length !== 0 && (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      )}
    </Stack>
  );
};

export default PhotoResizer;
