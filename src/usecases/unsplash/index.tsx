import { Search } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  ImageList,
  ImageListItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getUsecaseDataFromServer } from '../../utils/api.utils';

type UnsplashedImage = {
  url: string;
  downloadLink: string;
  user: string;
};

const Unsplash: React.FC = () => {
  const [unsplashedImage, setUnsplashedImage] = useState<UnsplashedImage[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSumbit = async () => {
    setLoading(true);
    if (searchTerm === '') {
      setError('Please enter a search term');
      return;
    }
    const data = await getUsecaseDataFromServer(12, {
      searchTerm,
    });
    if (!data) {
      setError('Something went wrong');
      return;
    }
    setLoading(false);
    setError(null);
    setUnsplashedImage(data as UnsplashedImage[]);
    return;
  };

  return (
    <Stack spacing={2} mx={2} my={5}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSumbit();
        }}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextField
          id="search-bar"
          className="text"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          label={'Search free high resolution photos'}
          variant="outlined"
          value={searchTerm}
          fullWidth
        />
        <IconButton type="submit" aria-label="search">
          <Search style={{ fill: 'primary' }} />
        </IconButton>
      </form>

      {loading ? <CircularProgress /> : null}
      {error ? <Typography color="error">{error}</Typography> : null}
      {unsplashedImage.length !== 0 ? (
        <ImageList
          sx={{ width: 1, height: 450 }}
          variant="quilted"
          cols={3}
          rowHeight={164}
        >
          {unsplashedImage.map((item) => (
            <ImageListItem
              key={item.url}
              onClick={() => window.open(item.downloadLink, '_blank')}
              sx={{ cursor: 'pointer' }}
            >
              <img
                src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.user}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : null}
    </Stack>
  );
};

export default Unsplash;
