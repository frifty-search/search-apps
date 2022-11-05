import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
import { DropzoneArea } from 'mui-file-dropzone';

const PngToJpeg: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (files: File[]) => {
    setFiles(files);
  };

  const handleClick = () => {
    // Convert PNG to JPEG
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      const image = new Image();
      image.src = reader.result as string;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(image, 0, 0);
          const dataURL = canvas.toDataURL('image/jpeg');
          const a = document.createElement('a');
          a.href = dataURL;
          a.download = 'image.jpeg';
          a.click();
        }
      };
    };
  };

  return (
    <Stack spacing={3} mx={2} my={5}>
      <DropzoneArea
        acceptedFiles={['image/png']}
        filesLimit={1}
        fileObjects={files}
        dropzoneText="Click to Upload"
        onChange={handleDrop}
        showPreviewsInDropzone
        showFileNamesInPreview
        onDropRejected={() => {
          alert('Only png files are accepted');
        }}
      />
      <Button variant="outlined" onClick={handleClick}>
        Convert & Download to JPEG
      </Button>
      {}
    </Stack>
  );
};

export default PngToJpeg;
