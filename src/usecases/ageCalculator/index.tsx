import React, { useState } from 'react';
import {
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

type Age = {
  years: {
    year: number;
    month: number;
  };
  months: number;
  weeks: number;
  days: number;
};

const AgeCalculator: React.FC = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs().startOf('day'));
  const [error, setError] = useState<string>('');
  const [age, setAge] = useState<Age | null>(null);

  const theme = useTheme();

  const handleChange = (newValue: Dayjs | null) => {
    if (!newValue) {
      setError('Please select a date');
      setAge(null);
      return;
    }
    if (newValue.isAfter(dayjs())) {
      setError('Date cannot be in future');
      setAge(null);
      setDate(newValue.startOf('day'));
      return;
    }
    setDate(newValue.startOf('day'));
    setError('');
  };

  const handleClick = () => {
    if (!date) {
      setError('Please select a date');
      setAge(null);
      return;
    }
    if (date.isAfter(dayjs())) {
      setError('Date cannot be in future');
      setAge(null);
      return;
    }

    if (!date.isValid()) {
      setError('Date is not valid');
      return;
    }

    const endDay = dayjs().startOf('day');

    const years = endDay.diff(date, 'years', true);
    const months = endDay.diff(date, 'month');
    const days = endDay.diff(date, 'days');
    const weeks = Math.floor(days / 7);

    setError('');
    setAge({
      years: {
        year: Math.floor(years),
        month: Math.floor((years % 1) * 12),
      },
      months,
      days,
      weeks,
    });
  };

  return (
    <Stack spacing={3} mx={2} my={5}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date of Birth (DD-MMM-YYYY)"
          inputFormat="DD-MMM-YYYY"
          value={date}
          onChange={handleChange}
          disableMaskedInput
          renderInput={(params) => <TextField {...params} disabled />}
        />
      </LocalizationProvider>
      <Button
        sx={{ mt: 1, mr: 1, boxShadow: 2 }}
        type="submit"
        variant="outlined"
        onClick={handleClick}
      >
        Calculate
      </Button>
      {age && (
        <Stack direction={'row'} justifyContent={'space-around'}>
          <Stack direction={'column'}>
            <Typography variant="h6"> Age </Typography>
          </Stack>
          <Stack direction={'column'}>
            <Typography variant="h6"> = </Typography>
            <Typography variant="h6"> = </Typography>
            <Typography variant="h6"> = </Typography>
            <Typography variant="h6"> = </Typography>
          </Stack>
          <Stack direction={'column'}>
            <Typography variant="h6">
              {' '}
              {age.years.year} years & {age.years.month} months{' '}
            </Typography>
            <Typography variant="h6"> {age.months} months</Typography>
            <Typography variant="h6"> {age.weeks} weeks</Typography>
            <Typography variant="h6"> {age.days} days</Typography>
          </Stack>
          <Stack direction={'row'}></Stack>
        </Stack>
      )}

      {error.length !== 0 && (
        <Typography
          variant="h6"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          style={{ color: theme.palette.error.main }}
        >
          {error}
        </Typography>
      )}
    </Stack>
  );
};

export default AgeCalculator;
