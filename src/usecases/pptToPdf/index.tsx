import React, { useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { DropzoneArea } from 'mui-file-dropzone';
import { postUsecaseDataFromServer } from '../../utils/api.utils';
import { saveAs } from 'file-saver';

const PptToPdf: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = (files: File[]) => {
    setFiles(files);
  };

  const handleClick = async () => {
    if (files.length === 0) {
      setError('Please select a file');
      return;
    }

    const [file] = files;

    const blobData = await postUsecaseDataFromServer(23, {
      file,
    });

    saveAs(blobData, 'converted.pdf');
    setError(null);
    return;
  };

  return (
    <Stack spacing={3} mx={2} my={5}>
      <DropzoneArea
        acceptedFiles={[
          'application/vnd.oasis.opendocument.presentation',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        ]}
        filesLimit={1}
        fileObjects={files}
        dropzoneText="Click to upload"
        onChange={handleDrop}
        showPreviewsInDropzone
        showFileNamesInPreview
      />
      <Button variant="outlined" onClick={handleClick}>
        Convert & Download to PDF
      </Button>
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}{' '}
    </Stack>
  );
};

export default PptToPdf;
