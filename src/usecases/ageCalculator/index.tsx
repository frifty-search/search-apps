import React, { useState } from 'react';
import { Button, Stack, TextField, Typography, useTheme } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const AgeCalculator: React.FC = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs().startOf('hours'));
  const [age, setAge] = useState<string>('');
  const [error, setError] = useState<string>('');
  const theme = useTheme();

  const handleChange = (newValue: Dayjs | null) => {
    if (!newValue) {
      setError('Please select a date');
      setAge('');
      return;
    }
    if (newValue.isAfter(dayjs())) {
      setError('Date cannot be in future');
      setAge('');
      setDate(newValue);
      return;
    }
    setDate(newValue);
    setError('');
  };

  const handleClick = () => {
    if (!date) {
      setError('Please select a date');
      setAge('');
      return;
    }
    if (date.isAfter(dayjs())) {
      setError('Date cannot be in future');
      setAge('');
      return;
    }

    if (!date.isValid()) {
      setError('Date is not valid');
      return;
    }

    const endDay = dayjs().startOf('day');
    console.log(endDay.format('YYYY-MM-DD HH:mm:ss'));
    let year = endDay.diff(date, 'year');
    let month = 0;
    let day = 0;
    if (endDay.month() < date.month()) {
      year -= 1;
      month = 12 - date.month() + endDay.month();
    } else {
      month = endDay.month() - date.month();
    }
    if (endDay.date() >= date.date()) {
      day = endDay.date() - date.date();
    } else {
      month -= 1;
      day = 31 - date.date() + endDay.date();
      if (month === -1) {
        year -= 1;
        month = 11;
      }
    }
    setError('');
    let timePeriod = ``;
    if (year > 0) {
      timePeriod += `${year} year${year > 1 ? 's' : ''}`;
    }
    if (month > 0) {
      timePeriod += `${year > 0 ? ', ' : ''}${month} month${
        month > 1 ? 's' : ''
      }`;
    }
    timePeriod += `${year > 0 || month > 0 ? ' and ' : ''}${day} day${
      day > 1 ? 's' : ''
    }`;
    setAge(timePeriod);
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
      {age.length !== 0 && (
        <Typography
          variant="h6"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Your age is {age}.
        </Typography>
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
