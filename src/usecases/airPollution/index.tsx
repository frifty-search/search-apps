import React, { useState } from 'react';
import {
  Button,
  Stack,
  TextField,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { getUsecaseDataFromServer } from '../../utils/api.utils';
type AirPollutionResponse = {
  city: string;
  airPollution: {
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
    dt: number;
  } | null;
  error: string | null;
};
const levels = [
  '',
  'clean air',
  'moderately polluted',
  'unhealthy for sensitive groups',
  'unhealthy',
  'very unhealthy',
  'hazardous to health',
];
const colors = ['', 'green', 'yellow', 'orange', 'red', 'purple', 'mahroon'];

const AirPollution: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setResult('');
    const data = (await getUsecaseDataFromServer(13, {
      city,
    })) as AirPollutionResponse;
    console.log(data.airPollution?.main.aqi);

    if (data.error) {
      setError(data.error);
      setResult('');

      return;
    }
    const { airPollution } = data;
    setLoading(false);
    setResult(
      `Air Quality Index of ${city} is ${airPollution!.main.aqi} and it is ${
        levels[airPollution!.main.aqi]
      } for you.`
    );
    setError('');
  };

  return (
    <Stack spacing={3} mx={1} my={5}>
      <Stack spacing={3} direction={'row'}>
        <TextField
          id="city"
          label="City Name"
          value={city}
          fullWidth
          onChange={(e) => {
            setCity(e.target.value);
          }}
          variant="outlined"
        />
      </Stack>
      <Button
        variant="outlined"
        type="submit"
        sx={{
          mt: 1,
          boxShadow: 2,
        }}
        onClick={handleClick}
      >
        {loading ? <CircularProgress /> : 'Check Air Quality'}
      </Button>
      {result.length !== 0 && (
        <Typography
          variant="h6"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {result}
        </Typography>
      )}

      {error.length !== 0 && (
        <Typography
          variant="h6"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {error}
        </Typography>
      )}
    </Stack>
  );
};

export default AirPollution;
