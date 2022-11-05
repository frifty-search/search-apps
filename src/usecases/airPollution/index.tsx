import React, { useState } from 'react';
import { Button, Stack, TextField, Typography, Box } from '@mui/material';
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
  'Clean Air',
  'Moderately Polluted',
  'Unhealthy for Sensitive Groups',
  'Unhealthy',
  'Very Unhealthy',
  'Hazardous to Health',
];
const colors = ['', 'green', 'yellow', 'orange', 'red', 'purple', 'mahroon'];
const AirPollution: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [aqi, setAqi] = useState(0);
  const handleClick = async () => {
    const data = (await getUsecaseDataFromServer(13, {
      city,
    })) as AirPollutionResponse;
    console.log(data.airPollution?.main.aqi);

    if (data.error) {
      setError(data.error);
      console.log(data.error);
      setResult('');

      return;
    }

    setResult(`Air Quality Index of ${city} is ${data.airPollution?.main.aqi}`);
    if (data.airPollution?.main.aqi) setAqi(data.airPollution?.main.aqi);
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
            // console.log("---",city);
            setCity(e.target.value);
            //console.log(city);
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
        Check
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
          <br/>
          <b>
          {levels[aqi]}
          </b>
          
       
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
