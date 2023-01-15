import { Button, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

const BirthyearCalculator: React.FC = () => {
  const [age, setAge] = useState(0);
  const [year, setYear] = useState<string | null>(null);

  const handleClick = () => {
    setYear(null);
    const today = dayjs().startOf('day');
    const year = today.subtract(age, 'year');
    setYear(year.format('YYYY'));
    return;
  };

  return (
    <Stack spacing={2} mx={2} my={5}>
      <TextField
        label="Enter your age"
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        fullWidth
      />
      <Button
        sx={{ mt: 1, mr: 1, boxShadow: 2 }}
        type="submit"
        variant="outlined"
        onClick={handleClick}
      >
        Calculate
      </Button>
      {year && <Typography variant="h6">Your birth year is {year}.</Typography>}
    </Stack>
  );
};

export default BirthyearCalculator;
