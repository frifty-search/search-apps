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

const PhotoSizeReducer: React.FC = () => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [error, setError] = React.useState('');
  const [quality, setQuality] = useState<number>(90);
  const [outputFormat, setOutputFormat] = useState<ResizeOutput>('');

  const handleDrop = (files: File[]) => {
    setFiles(files);
  };

  const getImageFromUrl = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        resolve(img);
      };
      img.onerror = (err) => {
        reject(err);
      };
      img.src = url;
    });
  };

  const handleClick = async () => {
    // Resize image

    const [file] = files;
    if (!file) {
      setError('Please select a file');
      return;
    }

    if (outputFormat === '') {
      setError('Please select output format');
      return;
    }

    const img = await getImageFromUrl(URL.createObjectURL(file));

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setError('Could not get canvas context');
      return;
    }
    ctx.drawImage(img, 0, 0);
    ctx.canvas.toBlob(
      (blob) => {
        if (!blob) {
          setError('Could not resize image');
          return;
        }
        saveAs(
          blob,
          `${file.name.split('.')[0]}.${outputFormat.toLowerCase()}`
        );
      },
      `image/${outputFormat.toLowerCase()}`,
      quality / 100
    );
  };

  return (
    <Stack spacing={3} mx={2} my={5}>
      <DropzoneArea
        acceptedFiles={['image/png', 'image/jpeg', 'image/jpg']}
        filesLimit={1}
        fileObjects={files}
        dropzoneText="Drag and drop a image file here or click"
        onChange={handleDrop}
        showPreviewsInDropzone
        showFileNamesInPreview
        onDropRejected={() => {
          alert('Only png files are accepted');
        }}
      />
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
      <Button variant="outlined" onClick={handleClick}>
        Convert & Download Image
      </Button>
      {error.length !== 0 && (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      )}
    </Stack>
  );
};

export default PhotoSizeReducer;
