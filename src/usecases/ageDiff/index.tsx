import React, { useState } from 'react';
import { Button, Stack, TextField, Typography, useTheme } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const AgeDiff: React.FC<{}> = () => {
  const [dob1, setDOB1] = useState<Dayjs>(dayjs());
  const [dob2, setDOB2] = useState<Dayjs>(dayjs());
  const [error, setError] = useState('');
  const [timePeriod, setTimePeriod] = useState('');

  const theme = useTheme();

  const handleDOB1Change = (newValue: Dayjs | null) => {
    if (!newValue) {
      setError('Start date is required');
      setTimePeriod('');
      return;
    }
    setDOB1(newValue.startOf('day'));
  };

  const handleDOB2Change = (newValue: Dayjs | null) => {
    if (newValue === null) {
      setError('End date cannot be empty');
      setTimePeriod('');
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
      const diff = dob1.diff(dob2, 'years');
      setTimePeriod(diff.toString());
    } else {
      const diff = dob2.diff(dob1, 'years');
      setTimePeriod(diff.toString());
    }
  };

  return (
    <Stack spacing={3} mx={2} my={5}>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date Of Birth 1 (DD-MM-YYYY)"
            inputFormat="DD-MMM-YYYY"
            value={dob1}
            onChange={handleDOB1Change}
            disableMaskedInput
            renderInput={(params) => (
              <TextField {...params} disabled fullWidth />
            )}
          />
          <DatePicker
            label="Date Of Birth 2 (DD-MM-YYYY)"
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
      {timePeriod.length !== 0 && (
        <Typography
          variant="h6"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'left',
          }}
        >
          The difference between two DOBs is {timePeriod}.
        </Typography>
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
