import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { getUsecaseDataFromServer } from '../../utils/api.utils';

type ResponseData = {
  data: string | null;
  error: string | null;
};

type SizeType = '1024x1024' | '512x512' | '256x256';

const ChatGpt: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [size, setSize] = useState<SizeType>('1024x1024');

  const handleClick = async () => {
    setError(null);
    setResult(null);
    setIsLoading(true);

    if (text === '') {
      setError('Please enter some text');
      setIsLoading(false);

      return;
    }

    const data: ResponseData = await getUsecaseDataFromServer(48, {
      text,
      size,
    });

    if (data.error) {
      setError(data.error);
      setIsLoading(false);

      return;
    }
    setIsLoading(false);
    setResult(data.data);
  };

  return (
    <Stack spacing={3} mx={2} my={5}>
      <TextField
        size="medium"
        multiline={true}
        value={text}
        label={'Enter your imagination ?'}
        onChange={(e) => setText(e.target.value)}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Output Size</InputLabel>
        <Select
          labelId={'demo-simple-select-label'}
          id={'demo-simple-select'}
          value={size}
          onChange={(e) => setSize(e.target.value as SizeType)}
          label={'Size'}
        >
          <MenuItem value={'1024x1024'}>1024x1024</MenuItem>
          <MenuItem value={'512x512'}>512x512</MenuItem>
          <MenuItem value={'256x256'}>256x256</MenuItem>
        </Select>
      </FormControl>
      {isLoading ? (
        <Button variant="outlined" onClick={() => {}} disabled>
          <CircularProgress />
        </Button>
      ) : (
        <Button variant="outlined" onClick={handleClick}>
          Create
        </Button>
      )}

      {result && <img src={result} width="100%" height="100%" loading="lazy" />}

      {error && (
        <Typography
          variant="h6"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'left',
          }}
          style={{ color: 'error' }}
        >
          {error}
        </Typography>
      )}
    </Stack>
  );
};

export default ChatGpt;
