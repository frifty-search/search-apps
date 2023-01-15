import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { getUsecaseDataFromServer } from '../../utils/api.utils';

type ResponseData = {
  data: {
    text: string | null;
    index: number;
    logprobs: {
      tokens?: Array<string>;
      token_logprobs?: Array<number>;
      top_logprobs?: Array<object>;
      text_offset?: Array<number>;
    } | null;
    finish_reason: string;
  }[];
  error: string | null;
};

const ChatGpt: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setError(null);
    setResult(null);
    setIsLoading(true);

    if (text === '') {
      setError('Please enter some text');
      setIsLoading(false);

      return;
    }

    const data: ResponseData = await getUsecaseDataFromServer(47, {
      text,
    });

    if (data.error) {
      setError(data.error);
      setIsLoading(false);

      return;
    }
    setIsLoading(false);
    setResult(data.data[0].text);
  };

  return (
    <Stack spacing={3} mx={2} my={5}>
      <TextField
        size="medium"
        multiline={true}
        value={text}
        label={'Enter your question ?'}
        onChange={(e) => setText(e.target.value)}
      />
      {isLoading ? (
        <Button variant="outlined" onClick={() => {}} disabled>
          <CircularProgress />
        </Button>
      ) : (
        <Button variant="outlined" onClick={handleClick}>
          Get me answer
        </Button>
      )}

      {result && (
        <Typography
          variant="body1"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'left',
          }}
        >
          {result}
        </Typography>
      )}

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
