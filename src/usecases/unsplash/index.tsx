import { Download, Search } from '@mui/icons-material';
import {
  CircularProgress,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import saveAs from 'file-saver';
import React, { useCallback, useEffect, useState } from 'react';
import { Controlled as ControlledZoom } from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { getUsecaseDataFromServer } from '../../utils/api.utils';

type UnsplashedImage = {
  url: string;
  downloadLink: string;
  user: string;
};

const ZoomUnsplashImageComponent = ({
  url,
  downloadLink,
  user,
}: UnsplashedImage) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoomChange = useCallback((shouldZoom: boolean) => {
    setIsZoomed(shouldZoom);
  }, []);

  return (
    <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
      <img
        src={
          isZoomed ? downloadLink : `${url}?w=164&h=164&fit=crop&auto=format`
        }
        alt={user}
        loading="lazy"
      />
    </ControlledZoom>
  );
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
            <ImageListItem key={item.url}>
              <ZoomUnsplashImageComponent
                url={item.url}
                downloadLink={item.downloadLink}
                user={item.user}
              />
              <ImageListItemBar
                actionIcon={
                  <IconButton
                    color="primary"
                    onClick={() => {
                      saveAs(
                        item.downloadLink,
                        `${item.user}-${new Date().getTime()}.jpg`
                      );
                    }}
                  >
                    <Download />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : null}
    </Stack>
  );
};

export default Unsplash;
