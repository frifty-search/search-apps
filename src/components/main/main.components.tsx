import React, { useState } from "react";

import { Box, Divider, Grid, Typography } from "@mui/material";

import {
  ThumbUpOutlined,
  ThumbDownOutlined,
  ThumbUp,
  ThumbDown,
} from "@mui/icons-material";

import { Apps } from "../../utils/api.utils";
import { renderApps } from "../utils/renderApps.utils";

type MainProps = {
  data: Apps;
  query: string;
};

export const Main: React.FC<MainProps> = ({ data }) => {
  const [likeValue, setLikeValue] = useState<number>(0);

  const onHandleLikeClick = (liked: number) => {
    switch (likeValue) {
      case 0:
        setLikeValue(liked);
        break;
      case 1:
        setLikeValue(liked === 1 ? 0 : liked);
        break;
      case -1:
        setLikeValue(liked === -1 ? 0 : liked);
        break;
    }
  };

  return (
    <Box
      sx={{
        width: 0.4,
        backgroundColor: "background.main",
        mt: 5,
        mb: 4,
        borderRadius: "16px",
        border: "1px solid #3c4043",
      }}
    >
      {renderApps(data)}
      <Divider variant="fullWidth">
        <Typography sx={{ fontStyle: "italic" }}>Powered by Frifty</Typography>
      </Divider>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
            paddingLeft={3}
          >
            <Box m={1}>
              <Typography variant="subtitle1">Is this useful ? </Typography>
            </Box>
            {likeValue === 0 ? (
              <>
                <Box m={1}>
                  <span
                    onClick={() => onHandleLikeClick(1)}
                    style={{ cursor: "pointer" }}
                  >
                    <ThumbUpOutlined />
                  </span>
                </Box>
                <Box m={1}>
                  <span
                    onClick={() => onHandleLikeClick(-1)}
                    style={{ cursor: "pointer" }}
                  >
                    <ThumbDownOutlined />
                  </span>
                </Box>
              </>
            ) : likeValue === 1 ? (
              <>
                <Box m={1}>
                  <span
                    onClick={() => onHandleLikeClick(0)}
                    style={{ cursor: "pointer" }}
                  >
                    <ThumbUp />
                  </span>
                </Box>
                <Box m={1}>
                  <span
                    onClick={() => onHandleLikeClick(-1)}
                    style={{ cursor: "pointer" }}
                  >
                    <ThumbDownOutlined />
                  </span>
                </Box>
              </>
            ) : (
              <>
                <Box m={1}>
                  <span
                    onClick={() => onHandleLikeClick(1)}
                    style={{ cursor: "pointer" }}
                  >
                    <ThumbUpOutlined />
                  </span>
                </Box>
                <Box m={1}>
                  <span
                    onClick={() => onHandleLikeClick(0)}
                    style={{ cursor: "pointer" }}
                  >
                    <ThumbDown />
                  </span>
                </Box>
              </>
            )}
          </Box>
        </Grid>
        <Grid item>
          <Box paddingRight={3} p={1}>
            <Typography
              variant="subtitle1"
              sx={{ textDecoration: "underline" }}
              display="inline"
            >
              Credits{" "}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
