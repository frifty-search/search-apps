import React, { useState } from 'react';
import { matchSorter } from 'match-sorter';
import {
  Button,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  Autocomplete,
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

const AirPollution: React.FC<{
  data: {
    cities: string[];
  };
}> = ({ data }: { data: { cities: string[] } }) => {
  const { cities } = data;
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
      `PM10 score = ${airPollution?.components.pm10}. 
      ` +
        '\n' +
        `This is categorized as  ${levels[airPollution!.main.aqi]} for you.`
    );
    setError('');
  };

  const handleChange = (
    _: React.SyntheticEvent,
    value: string,
    reason: string
  ) => {
    if (reason === 'reset') {
      setCity(value);
    } else if (reason === 'input') {
      setCity(value);
    }
  };

  return (
    <Stack spacing={3} mx={1} my={5}>
      <Stack spacing={3} direction={'row'}>
        <Autocomplete
          disablePortal
          fullWidth
          id="Cities-Prompt"
          options={cities}
          renderInput={(params) => (
            <TextField
              {...params} //cannot use "id" property here as {...params} overrides the "id" property
              label="City Name"
              value={city}
              fullWidth
              variant="outlined"
            />
          )}
          onInputChange={handleChange}
        />
        {/* <TextField
          id="city"
          label="City Name"
          value={city}
          fullWidth
          onChange={(e) => {
            setCity(e.target.value);
          }}
          variant="outlined"
        /> */}
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
