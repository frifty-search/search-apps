import React, { useState } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';

type ResponseData = {
  ok: boolean;
  result: Result;
};

type Result = {
  code: string;
  short_link: string;
  full_short_link: string;
  short_link2: string;
  full_short_link2: string;
  short_link3: string;
  full_short_link3: string;
  share_link: string;
  full_share_link: string;
  original_link: string;
};

const UrlShortner: React.FC = () => {
  const [value, setValue] = useState<string | null>(null);
  const [shortUrl, setShortUrl] = useState<Result | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    const url = `https://api.shrtco.de/v2/shorten?url=${value}`;
    fetch(url).then((response) => {
      response.json().then((data: ResponseData) => {
        setShortUrl(data.result);
      });
    });
  };

  return (
    <Stack spacing={3} mx={2} my={5}>
      <TextField
        label="Enter text to generate short url"
        variant="outlined"
        value={value ?? ''}
        onChange={handleChange}
        fullWidth
      />
      <Button variant="outlined" onClick={handleClick}>
        Generate Short URL
      </Button>
      {shortUrl && (
        <Stack sx={{ display: 'flex', alignItems: 'left', textAlign: 'left' }}>
          <Typography variant="body1">
            <b>Short URL:</b>{' '}
            <a
              href={shortUrl.full_short_link}
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
              }}
            >
              {shortUrl.short_link}
            </a>
          </Typography>
          <br />
          <Typography variant="body1">
            <b>Short URL 2:</b>{' '}
            <a
              href={shortUrl.full_short_link2}
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
              }}
            >
              {shortUrl.short_link2}
            </a>
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default UrlShortner;
