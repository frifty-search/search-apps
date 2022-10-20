import React, { useState } from 'react';
import { Button, Stack, TextField, Typography, useTheme } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const DaysDiffFromNow: React.FC<{}> = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [addDate, setAddValue] = useState<{
    days: number;
    months: number;
    years: number;
  }>({
    days: 0,
    months: 0,
    years: 0,
  });

  const [age, setAge] = useState<string>('');
  const [error, setError] = useState<string>('');
  const theme = useTheme();

  const handleChange = (newValue: Dayjs | null) => {
    setDate(newValue);
  };

  const handleValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddValue({
      ...addDate,
      [name]: parseInt(value),
    });
  };

  const handleClick = () => {
    if (!date) {
      setError('Please select a date');
      setAge('');
      return;
    }
    if (date.isValid()) {
      const newDate = date
        .add(addDate.years, 'year')
        .add(addDate.months, 'month')
        .add(addDate.days, 'day');
      setAge(
        `${date.format('DD/MM/YYYY')} after ${addDate.years} years, ${
          addDate.months
        } months and ${addDate.days} days is ${newDate.format('DD/MM/YYYY')}`
      );
      setError('');
    } else {
      setError('Please select a valid date');
    }
  };

  console.log(theme.palette.mode);

  return (
    <Stack spacing={3} mx={2} my={5}>
      <Stack direction="row" spacing={1} alignItems="center">
        <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
          <DatePicker
            label="Start Date (DD-MMM-YYYY)"
            inputFormat="DD-MMM-YYYY"
            value={date}
            onChange={handleChange}
            disableMaskedInput
            renderInput={(params) => (
              <TextField {...params} disabled fullWidth />
            )}
          />
        </LocalizationProvider>
        <Typography variant="subtitle1">+</Typography>
        <TextField
          defaultValue={addDate.years.toString()}
          label={'Years'}
          onChange={handleValues}
          name={'years'}
          variant={'outlined'}
          required
        />
        <Typography variant="subtitle1">+</Typography>
        <TextField
          defaultValue={addDate.months.toString()}
          label={'Months'}
          onChange={handleValues}
          name={'months'}
          variant={'outlined'}
          required
        />
        <Typography variant="subtitle1">+</Typography>
        <TextField
          defaultValue={addDate.days.toString()}
          label={'Days'}
          onChange={handleValues}
          name={'days'}
          variant={'outlined'}
          required
        />
      </Stack>
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
          {age}.
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

export default DaysDiffFromNow;
