import React, { useState } from 'react';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { DropzoneArea } from 'mui-file-dropzone';
import { postUsecaseDataFromServer } from '../../utils/api.utils';
import { saveAs } from 'file-saver';

const DocToPdf: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDrop = (files: File[]) => {
    setFiles(files);
  };

  const handleClick = async () => {
    if (files.length === 0) {
      setError('Please select a file');
      return;
    }

    setIsLoading(true);

    const [file] = files;

    const blobData = await postUsecaseDataFromServer(23, {
      file,
    });

    const regex = new RegExp('[^.]+$');
    const newFileName = file.name.replace(regex, 'pdf');

    setIsLoading(false);
    saveAs(blobData, newFileName);
    setError(null);
    return;
  };

  return (
    <Stack spacing={3} mx={2} my={5}>
      <DropzoneArea
        acceptedFiles={[
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.oasis.opendocument.text',
        ]}
        filesLimit={1}
        fileObjects={files}
        dropzoneText="Click to upload"
        onChange={handleDrop}
        showPreviewsInDropzone
        showFileNamesInPreview
        showFileNames
      />
      {isLoading ? (
        <Button variant="outlined" onClick={() => {}} disabled>
          <CircularProgress />
        </Button>
      ) : (
        <Button variant="outlined" onClick={handleClick}>
          Convert & Download to PDF
        </Button>
      )}
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}{' '}
    </Stack>
  );
};

export default DocToPdf;
