import { ImageList, ImageListItem, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getUsecaseDataFromServer } from '../../utils/api.utils';

type AnandBazzarResponse = {
  pageNo: number;
  imageUrl: string;
};

const AnandBazaarPatrika: React.FC = () => {
  const [pages, setPages] = useState<AnandBazzarResponse[] | null>(null);

  const getImages = async ({
    pageNo,
    imageUrl,
  }: {
    pageNo: number;
    imageUrl: string;
  }): Promise<{
    pageNo: number;
    imageUrl: string;
  }> => {
    const response = await fetch(imageUrl);
    const data = await response.blob();
    return {
      pageNo,
      imageUrl: URL.createObjectURL(data),
    };
  };

  useEffect(() => {
    getUsecaseDataFromServer(36, {}).then(
      async (data: AnandBazzarResponse[]) => {
        const value = await Promise.all(
          data.map((img) => {
            return getImages(img);
          })
        );
        setPages(value);
      }
    );
  }, []);

  return !pages ? null : (
    <Stack
      spacing={2}
      mx={2}
      my={5}
      sx={{
        maxHeight: '450px',
        overflowY: 'auto',
      }}
    >
      {pages.map((item) => (
        <img
          key={item.pageNo}
          src={item.imageUrl}
          alt={`Page ${item.pageNo}`}
        />
      ))}
    </Stack>
  );
};

export default AnandBazaarPatrika;
