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
  const [outputFormat, setOutputFormat] = useState<ResizeOutput>('');
  const [error, setError] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number>(16 / 9);

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

  const handleDrop = (files: File[]) => {
    setFiles(files);
    const [file] = files;
    if (file) {
      getImageFromUrl(URL.createObjectURL(file))
        .then((img) => {
          setWidth(img.width);
          setHeight(img.height);
          setAspectRatio(img.width / img.height);
          setError(null);
          return;
        })
        .catch((err) => {
          setError(err);
          return;
        });
    }
  };

  const handleClick = () => {
    // Resize image

    const [file] = files;
    setError(null);
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
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          ctx.canvas.toBlob(
            (blob) => {
              saveAs(
                blob as Blob,
                `${
                  file.name.split('.')[0]
                }-${width}x${height}.${outputFormat.toLowerCase()}`
              );
            },
            `image/${outputFormat.toLowerCase()}`,
            1
          );
          elem.remove();
        }
      };
    };
  };

  const handleWidthHeight = (value: number, orientation: 'w' | 'h') => {
    if (orientation === 'w') {
      setWidth(value);
      setHeight(Math.round(value / aspectRatio));
    } else {
      setHeight(value);
      setWidth(Math.round(value * aspectRatio));
    }
  };

  return (
    <Stack spacing={3} mx={2} my={5}>
      <DropzoneArea
        acceptedFiles={['image/png', 'image/jpeg', 'image/jpg']}
        filesLimit={1}
        fileObjects={files}
        dropzoneText="Click to upload"
        onChange={handleDrop}
        onDropRejected={(files) => {
          setError(`${files[0].name} is not supported`);
        }}
        onDelete={() => {
          setFiles([]);
          setError(null);
          setWidth(0);
          setHeight(0);
        }}
        showPreviewsInDropzone
        showFileNamesInPreview
      />
      <Stack spacing={3} direction="row">
        <TextField
          label="Width in Pixel"
          onChange={(e) => handleWidthHeight(+e.target.value, 'w')}
          value={width}
          helperText="Aspect Ratio is fixed"
          type="number"
          fullWidth
        />
        <TextField
          label="Height in Pixel"
          onChange={(e) => handleWidthHeight(+e.target.value, 'h')}
          value={height}
          helperText="Aspect Ratio is fixed"
          type="number"
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

      <Button variant="outlined" onClick={handleClick}>
        Convert & Download
      </Button>
      {error && (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      )}
    </Stack>
  );
};

export default PhotoResizer;
