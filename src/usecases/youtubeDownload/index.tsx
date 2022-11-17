import React, { useState } from 'react';
import {
  Button,
  Divider,
  Stack,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TextField,
  Typography,
  TableCell,
} from '@mui/material';
import { getUsecaseDataFromServer } from '../../utils/api.utils';
import { saveAs } from 'file-saver';
interface VideoFormat {
  itag: number;
  url: string;
  mimeType?: string;
  qualityLabel:
    | '144p'
    | '144p 15fps'
    | '144p60 HDR'
    | '240p'
    | '240p60 HDR'
    | '270p'
    | '360p'
    | '360p60 HDR'
    | '480p'
    | '480p60 HDR'
    | '720p'
    | '720p60'
    | '720p60 HDR'
    | '1080p'
    | '1080p60'
    | '1080p60 HDR'
    | '1440p'
    | '1440p60'
    | '1440p60 HDR'
    | '2160p'
    | '2160p60'
    | '2160p60 HDR'
    | '4320p'
    | '4320p60';
  container: 'flv' | '3gp' | 'mp4' | 'webm' | 'ts';
  hasVideo: boolean;
  hasAudio: boolean;
  codecs: string;
  videoCodec?: string;
  audioCodec?: string;
}
interface VideoInfo {
  videoId: string;
  title: string;
  description: string;
  thumbnails: {
    url: string;
    width: number;
    height: number;
  }[];
}
interface YTDLResponse {
  videoDetails: VideoInfo;
  formats: VideoFormat[];
}
const YoutubeDownload: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFormats, setVideoFormats] = useState<VideoFormat[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);

  const handleClick = async () => {
    try {
      const regexYTShare = /https\:\/\/youtu\.be\/[\s\S]+/gm;
      const regexYTWatch = /https\:\/\/www\.youtube\.com\/watch\?v\=[\s\S]+/gm;

      if (!videoUrl.match(regexYTShare) && !videoUrl.match(regexYTWatch)) {
        setError('Invalid Youtuble URL');
        return;
      }

      const response: YTDLResponse = await getUsecaseDataFromServer(20, {
        url: videoUrl,
      });
      setVideoInfo(response.videoDetails);
      setVideoFormats(response.formats);
      setError(null);
      return;
    } catch (error) {
      const errorValue = error as Error;
      setError(errorValue!.message);
      return;
    }
  };

  const handleDownload = async (item: VideoFormat) => {
    try {
      setError(null);
      if (item.hasAudio && item.container == 'mp4') {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', item.url, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
          let urlCreator = window.URL || window.webkitURL;
          let videoUrl = urlCreator.createObjectURL(this.response);
          let tag = document.createElement('a');
          tag.href = videoUrl;
          tag.target = '_blank';
          tag.download = `${videoInfo?.title}.mp3`;
          document.body.appendChild(tag);
          tag.click();
          document.body.removeChild(tag);
        };
        xhr.onerror = (err) => {};
        xhr.send();
        return;
      }
      const url = item.url;
      const filename = `${videoInfo?.title}.${item.container}`;
      const response = await fetch(url);
      const blob = await response.blob();
      saveAs(blob, filename);

      return;
    } catch (error) {
      const errorValue = error as Error;
      setError(errorValue!.message);
      return;
    }
  };

  return (
    <Stack spacing={3} mx={2} my={5}>
      <TextField
        label="Enter Youtube Video URL"
        variant="outlined"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        fullWidth
      />
      <Button variant="outlined" onClick={handleClick}>
        Fetch Data
      </Button>
      {videoInfo && (
        <Stack spacing={3} direction="row">
          <Stack>
            <Typography variant="h5">{videoInfo.title}</Typography>
          </Stack>
          <Stack>
            <img
              src={videoInfo.thumbnails[0].url}
              alt="thumbnail"
              width={videoInfo.thumbnails[0].width}
              height={videoInfo.thumbnails[0].height}
            />
          </Stack>
        </Stack>
      )}
      {videoFormats.length > 0 && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Format</TableCell>
              <TableCell>Quality</TableCell>
              <TableCell>Audio/Video</TableCell>
              <TableCell>Download</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {videoFormats.map((format) => (
              <TableRow key={format.itag}>
                <TableCell>
                  {format.hasAudio && format.container == 'mp4'
                    ? 'mp3'
                    : format.container}
                </TableCell>
                <TableCell>{format.qualityLabel}</TableCell>
                <TableCell>
                  {format.hasVideo ? 'Video' : format.hasAudio ? 'Audio' : ''}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleDownload(format)}
                  >
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {error && (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      )}
    </Stack>
  );
};

export default YoutubeDownload;
