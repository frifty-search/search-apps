import React, { useState } from 'react';

import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';

import {
  ThumbUpOutlined,
  ThumbDownOutlined,
  ThumbUp,
  ThumbDown,
  Close,
} from '@mui/icons-material';

import { Apps } from '../../utils/api.utils';
import { renderApps } from '../utils/renderApps.utils';

type MainProps = {
  data: Apps;
  query: string;
};

type CreditsProps = {
  developer: [
    {
      name: string;
      url: string;
    }
  ];
  maintainer: [
    {
      name: string;
      url: string;
    }
  ];
  source: [
    {
      name: string;
      url: string;
    }
  ];
};

const Credits: React.FC<CreditsProps> = (credits: CreditsProps) => {
  const { developer, maintainer, source } = credits;
  return (
    <Typography
      style={{
        marginTop: 1,
        marginBottom: 1,
      }}
    >
      Developer - {'  '}
      {developer.map((dev, index) => (
        <a
          key={`developer-${index}`}
          href={dev.url}
          target="_blank"
          rel="noreferrer"
          style={{
            textDecoration: 'underline',
            color: 'inherit',
            cursor: 'pointer',
          }}
        >
          {dev.name}
          {index !== developer.length - 1 && ', '}
        </a>
      ))}
      {maintainer.length > 0 && <br />}
      {maintainer.length > 0 && `Contributors -`}
      {maintainer.length > 0 &&
        maintainer.map((maint, index) => (
          <a
            key={`maintainer-${index}`}
            href={maint.url}
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: 'underline',
              color: 'inherit',
              cursor: 'pointer',
            }}
          >
            {maint.name}
            {index !== maintainer.length - 1 && ', '}
          </a>
        ))}
      {source.length > 0 && <br />}
      {source.length > 0 && `Sources -`}
      {source.length > 0 &&
        source.map((sour, index) => (
          <a
            key={`source-${index}`}
            href={sour.url}
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: 'underline',
              color: 'inherit',
              cursor: 'pointer',
            }}
          >
            {sour.name}
            {index !== source.length - 1 && ', '}
          </a>
        ))}
    </Typography>
  );
};

export const Main: React.FC<MainProps> = ({ data }) => {
  const [likeValue, setLikeValue] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

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
        backgroundColor: 'background.main',
        mt: 5,
        mb: 4,
        borderRadius: '16px',
        border: '1px solid #3c4043',
      }}
    >
      {renderApps(data)}
      <Divider variant="fullWidth">
        <Typography sx={{ fontStyle: 'italic' }}>Powered by Frifty</Typography>
      </Divider>
      {open ? (
        <>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
            }}
          >
            <IconButton
              onClick={() => setOpen(false)}
              sx={{ color: 'text.secondary' }}
            >
              <Close />
            </IconButton>
          </Box>
          <Box paddingLeft={4}>
            <Credits {...data.credits} />
          </Box>
        </>
      ) : (
        <></>
      )}
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Grid item>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            paddingLeft={3}
          >
            <Box m={1}>
              <Typography variant="subtitle1">Is this useful ? </Typography>
            </Box>
            {likeValue === 0 ? (
              <>
                <Box m={1}>
                  <IconButton
                    onClick={() => onHandleLikeClick(1)}
                    style={{ cursor: 'pointer' }}
                  >
                    <ThumbUpOutlined />
                  </IconButton>
                </Box>
                <Box m={1}>
                  <IconButton
                    onClick={() => onHandleLikeClick(-1)}
                    style={{ cursor: 'pointer' }}
                  >
                    <ThumbDownOutlined />
                  </IconButton>
                </Box>
              </>
            ) : likeValue === 1 ? (
              <>
                <Box m={1}>
                  <IconButton
                    onClick={() => onHandleLikeClick(0)}
                    style={{ cursor: 'pointer' }}
                  >
                    <ThumbUp />
                  </IconButton>
                </Box>
                <Box m={1}>
                  <IconButton
                    onClick={() => onHandleLikeClick(-1)}
                    style={{ cursor: 'pointer' }}
                  >
                    <ThumbDownOutlined />
                  </IconButton>
                </Box>
              </>
            ) : (
              <>
                <Box m={1}>
                  <IconButton
                    onClick={() => onHandleLikeClick(1)}
                    style={{ cursor: 'pointer' }}
                  >
                    <ThumbUpOutlined />
                  </IconButton>
                </Box>
                <Box m={1}>
                  <IconButton
                    onClick={() => onHandleLikeClick(0)}
                    style={{ cursor: 'pointer' }}
                  >
                    <ThumbDown />
                  </IconButton>
                </Box>
              </>
            )}
          </Box>
        </Grid>
        <Grid item>
          <Box
            paddingRight={3}
            p={1}
            onClick={() => setOpen(true)}
            style={{
              cursor: 'pointer',
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ textDecoration: 'underline' }}
              display="inline"
            >
              Credits{' '}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
