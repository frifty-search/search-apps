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
    [key: string]: string;
  };
}> = ({
  data,
}: {
  data: {
    [key: string]: string;
  };
}) => {
  const timezoneLabels = data;
  const [givenTime, setgivenTime] = useState<Dayjs | null>(dayjs());
  const [yourCountry, setYourCountry] = useState<string>();
  const [country1, setCountry1] = useState<string>();
  const [country2, setCountry2] = useState<string>();
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<React.ReactNode | null>(null);

  const handleClick = () => {
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
    let time1: Dayjs | null = null,
      time2: Dayjs | null = null;
    if (country1) {
      const country1timezone = timezoneLabels[country1];
      time1 = givenTimeInCurrentCountry.tz(country1timezone);
    }

    if (country2 && country2 in timezoneLabels) {
      const country2timezone = timezoneLabels[country2];
      time2 = givenTimeInCurrentCountry.tz(country2timezone);
    }
    setError('');
    if (time1) {
      setResult(
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{yourCountry}</TableCell>
              <TableCell>
                {givenTimeInCurrentCountry.format('hh:mm A ddd')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{country1}</TableCell>
              <TableCell>{time1.format('hh:mm A ddd')}</TableCell>
            </TableRow>
            {time2 && (
              <TableRow>
                <TableCell>{country2}</TableCell>
                <TableCell>{time2.format('hh:mm A ddd')}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      );
    }
  };

  return (
    <Stack spacing={2} mx={2} my={5}>
      <Stack spacing={2} direction={'column'}>
        <Typography variant={'h6'} sx={{ fontWeight: 'bold' }}>
          Convert From
        </Typography>
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

      <Stack spacing={2} direction={'column'}>
        <Typography variant={'h6'} sx={{ fontWeight: 'bold' }}>
          Convert To
        </Typography>
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
      {result != null && result}
    </Stack>
  );
};

export default TimezoneConverter;
