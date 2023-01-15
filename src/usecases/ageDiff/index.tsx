import React, { useState } from 'react';
import { Button, Stack, TextField, Typography, useTheme } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

type Age = {
  years: {
    year: number;
    month: number;
  };
  months: number;
  weeks: number;
  days: number;
  statement: string;
};

const AgeDiff: React.FC<{}> = () => {
  const [dob1, setDOB1] = useState<Dayjs>(dayjs());
  const [dob2, setDOB2] = useState<Dayjs>(dayjs());
  const [error, setError] = useState('');
  const [age, setAge] = useState<Age | null>(null);

  const theme = useTheme();

  const handleDOB1Change = (newValue: Dayjs | null) => {
    if (!newValue) {
      setError('Start date is required');
      setAge(null);
      return;
    }
    setDOB1(newValue.startOf('day'));
  };

  const handleDOB2Change = (newValue: Dayjs | null) => {
    if (newValue === null) {
      setError('End date cannot be empty');
      setAge(null);
      return;
    }
    setDOB2(newValue.startOf('day'));
  };

  const handleClick = () => {
    if (!dob1.isValid() && !dob2.isValid()) {
      setError(`Start Date & End Date are not Valid`);
      return;
    }
    if (!dob1.isValid()) {
      setError(`Start Date is not valid`);
      return;
    }
    if (!dob2.isValid()) {
      setError(`End Date is not valid.`);
      return;
    }
    if (dob1.isAfter(dob2)) {
      const years = dob1.diff(dob2, 'years', true);
      const months = dob1.diff(dob2, 'month');
      const days = dob1.diff(dob2, 'days');
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
        statement: 'Person A is younger than Person B',
      });
    } else {
      const years = dob2.diff(dob1, 'years', true);
      const months = dob2.diff(dob1, 'month');
      const days = dob2.diff(dob1, 'days');
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
        statement: 'Person B is younger than Person A',
      });
    }
  };

  return (
    <Stack spacing={3} mx={2} my={5}>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date Of Birth of A (DD-MM-YYYY)"
            inputFormat="DD-MMM-YYYY"
            value={dob1}
            onChange={handleDOB1Change}
            disableMaskedInput
            renderInput={(params) => (
              <TextField {...params} disabled fullWidth />
            )}
          />
          <DatePicker
            label="Date Of Birth of B (DD-MM-YYYY)"
            inputFormat="DD-MMM-YYYY"
            value={dob2}
            onChange={handleDOB2Change}
            disableMaskedInput
            renderInput={(params) => (
              <TextField {...params} disabled fullWidth />
            )}
          />
        </LocalizationProvider>
      </Stack>

      <Button
        sx={{ mt: 1, mr: 1, boxShadow: 2 }}
        type="submit"
        variant="outlined"
        onClick={handleClick}
      >
        Calculate
      </Button>
      {age && (
        <>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'left',
            }}
          >
            {age.statement}
          </Typography>
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
        </>
      )}

      {error.length !== 0 && (
        <Typography
          variant="h6"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'left',
          }}
          style={{ color: theme.palette.error.main }}
        >
          {error}
        </Typography>
      )}
    </Stack>
  );
};

export default AgeDiff;
