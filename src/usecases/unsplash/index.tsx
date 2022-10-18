import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUsecaseDataFromServer } from "../../utils/api.utils";

type UnsplashedImage = {
  url: string;
  downloadLink: string;
  user: string;
};

const Unsplash: React.FC = () => {
  const [unsplashedImage, setUnsplashedImage] = useState<UnsplashedImage[]>([]);

  useEffect(() => {
    getUsecaseDataFromServer(12, {}).then((data) => {
      setUnsplashedImage(data as UnsplashedImage[]);
    });
  }, []);

  return (
    <Box>
      <Typography variant="h5" align="center">
        Images from Unsplash by Frifty
      </Typography>
      <ImageList
        sx={{ width: 1, height: 450 }}
        variant="quilted"
        cols={3}
        rowHeight={164}
      >
        {unsplashedImage.map((item) => (
          <ImageListItem
            key={item.url}
            onClick={() => window.open(item.downloadLink, "_blank")}
            sx={{ cursor: "pointer" }}
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
    </Box>
  );
};

export default Unsplash;
