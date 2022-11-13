import React, { useState } from 'react';
import {
  Autocomplete,
  Button,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  Typography,
  TableBody,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import timezones from 'timezones-list';

dayjs.extend(utc);
dayjs.extend(timezone);

export interface Timezone {
  name: string;
  alternativeName: string;
  group: string[];
  continentCode: string;
  continentName: string;
  countryName: string;
  countryCode: string;
  mainCities: string[];
  rawOffsetInMinutes: number;
  abbreviation: string;
  rawFormat: string;
}

const TimezoneConverter: React.FC<{
  data: {
    timezones: {
      [key: string]: Timezone;
    };
    timezoneLabels: {
      [key: string]: string;
    };
  };
}> = ({
  data,
}: {
  data: {
    timezones: {
      [key: string]: Timezone;
    };
    timezoneLabels: {
      [key: string]: string;
    };
  };
}) => {
  const { timezoneLabels } = data;
  const [givenTime, setgivenTime] = useState<Dayjs | null>(dayjs());
  const [yourCountry, setYourCountry] = useState<string>();
  const [country1, setCountry1] = useState<string>();
  const [country2, setCountry2] = useState<string>();
  const [time1, setTime1] = useState<Dayjs | null>(null);
  const [time2, setTime2] = useState<Dayjs | null>(null);
  const [error, setError] = useState<string>('');

  const handleClick = () => {
    setTime1(null);
    setTime2(null);
    if (!givenTime || !yourCountry) {
      setError('Please fill all the fields');
      return;
    }
    if (!country1 || !(country1 in timezoneLabels)) {
      setError('Please select a country');
      return;
    }

    const currentCountryTimeZone = timezoneLabels[yourCountry];
    const givenTimeInCurrentCountry = dayjs()
      .tz(currentCountryTimeZone)
      .set('hour', givenTime.hour())
      .set('minute', givenTime.minute());
    if (country1) {
      const country1timezone = timezoneLabels[country1];
      const time1 = givenTimeInCurrentCountry.tz(country1timezone);
      setTime1(time1);
    }

    if (country2 && country2 in timezoneLabels) {
      const country2timezone = timezoneLabels[country2];
      const time2 = givenTimeInCurrentCountry.tz(country2timezone);
      setTime2(time2);
    }
    setError('');
  };

  return (
    <Stack spacing={1} mx={1} my={5}>
      <Stack direction="row" spacing={1}>
        <Stack spacing={1} direction={'column'}>
          <Autocomplete
            freeSolo
            id="your-country"
            disableClearable
            options={Object.keys(timezoneLabels).map((v) => v)}
            placeholder={'Your country'}
            renderInput={(params) => (
              <TextField
                {...params}
                label={'Your Country'}
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
                fullWidth
              />
            )}
            onInputChange={(
              _: React.SyntheticEvent,
              value: string,
              reason: string
            ) => {
              if (reason === 'reset') {
                setYourCountry(value);
              } else if (reason === 'input') {
                setYourCountry(value);
              }
            }}
            fullWidth
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Select Time"
              renderInput={(params) => <TextField {...params} fullWidth />}
              ampm
              value={givenTime}
              onChange={(newValue) => {
                setgivenTime(newValue);
              }}
            />
          </LocalizationProvider>
        </Stack>
        <Typography variant="h4" sx={{ alignSelf: 'center' }}>
          =
        </Typography>
        <Stack spacing={1} direction={'column'}>
          <Autocomplete
            freeSolo
            id="country-1"
            disableClearable
            options={Object.keys(timezoneLabels).map((v) => v)}
            placeholder={'Country 1'}
            renderInput={(params) => (
              <TextField
                {...params}
                label={'Country 1'}
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
                fullWidth
              />
            )}
            onInputChange={(
              _: React.SyntheticEvent,
              value: string,
              reason: string
            ) => {
              if (reason === 'reset') {
                setCountry1(value);
              } else if (reason === 'input') {
                setCountry1(value);
              }
            }}
            fullWidth
          />
          <TextField
            label="Time 1"
            InputProps={{
              readOnly: true,
            }}
            value={time1 == null ? '' : time1.format('HH:mm A dddd')}
            disabled
            fullWidth
            variant="outlined"
          />
        </Stack>
        <Stack spacing={1} direction={'column'}>
          <Autocomplete
            freeSolo
            id="country-2"
            disableClearable
            options={Object.keys(timezoneLabels).map((v) => v)}
            placeholder={'Country 2'}
            renderInput={(params) => (
              <TextField
                {...params}
                label={'Country 2'}
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
                fullWidth
              />
            )}
            onInputChange={(
              _: React.SyntheticEvent,
              value: string,
              reason: string
            ) => {
              if (reason === 'reset') {
                setCountry2(value);
              } else if (reason === 'input') {
                setCountry2(value);
              }
            }}
            fullWidth
          />
          <TextField
            label="Time 2"
            InputProps={{
              readOnly: true,
            }}
            value={time2 == null ? '' : time2.format('HH:mm A dddd')}
            disabled
            fullWidth
            variant="outlined"
          />
        </Stack>
      </Stack>

      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        fullWidth
        sx={{ mt: 2 }}
      >
        Convert
      </Button>
      {error.length !== 0 && (
        <Typography color="error" variant={'h6'}>
          {error}
        </Typography>
      )}
    </Stack>
  );
};

export default TimezoneConverter;
