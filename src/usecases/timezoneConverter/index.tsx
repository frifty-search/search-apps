import React, { useState } from 'react';
import {
  Button,
  Stack,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import timezones, { TimeZone } from 'timezone-abbreviations';

dayjs.extend(utc);
dayjs.extend(timezone);

const TimezoneConverter: React.FC = () => {
  const [givenTime, setgivenTime] = useState<Dayjs | null>(null);
  const [country1, setCountry1] = useState<string>();
  const [country2, setCountry2] = useState<string>();
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const countryObject = timezones.reduce((acc, timezone) => {
    if (timezone.names) {
      acc[timezone.abbr] = timezone;
    }
    return acc;
  }, {} as { [key: string]: TimeZone });
  const countryArray = Object.keys(countryObject);
  countryArray.push('');
  countryArray.sort();

  const handleClick = () => {
    if (!givenTime || !country1 || !country2) {
      setError('Please fill all the fields');
      return;
    }
    if (!(country1 in countryObject) || !(country2 in countryObject)) {
      setError('Please select a valid country');
      return;
    }
    const country1timezone = countryObject[country1].names![0];
    const country2timezone = countryObject[country2].names![0];
    const time1 = dayjs()
      .tz(country1timezone)
      .set('hour', givenTime.hour())
      .set('minute', givenTime.minute());
    const time2 = time1.tz(country2timezone);
    setError('');
    setResult(
      `${time1.format('HH:mm A ddd')} in ${country1} is   ${time2.format(
        'HH:mm A ddd'
      )} in ${country2}`
    );
  };

  return (
    <Stack spacing={1} mx={1} my={5}>
      <Stack spacing={1} direction={'row'}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Select Time"
            renderInput={(params) => <TextField {...params} fullWidth />}
            value={givenTime}
            onChange={(newValue) => {
              setgivenTime(newValue);
            }}
          />
        </LocalizationProvider>
        <FormControl fullWidth>
          <InputLabel id="country1-select-label">Country 1</InputLabel>
          <Select
            labelId="country1-select-label"
            id="country1-select"
            value={country1 || ''}
            placeholder={'Country 1'}
            onChange={(e) => {
              setCountry1(e.target.value as string);
            }}
          >
            {countryArray.map((name, index) => {
              return (
                <MenuItem value={name} key={`country1-${index}`}>
                  {name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="country2-select-label">Country 2</InputLabel>
          <Select
            labelId="country2-select-label"
            id="country2-select"
            value={country2 || ''}
            label={country2}
            onChange={(e) => {
              setCountry2(e.target.value as string);
            }}
            fullWidth
          >
            {countryArray.map((name, index) => {
              return (
                <MenuItem value={name} key={`country2-${index}`}>
                  {name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
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
      {result.length !== 0 && <Typography variant="h6">{result}</Typography>}
    </Stack>
  );
};

export default TimezoneConverter;
