import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

const PercentageCalculator: React.FC = () => {
  const [percentage, setPercentage] = useState<number>(-1);
  const [number, setNumber] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const calculatePercentage = () => {
    if (number === 0) {
      setError('Please enter numerator');
      return;
    }
    if (total === 0) {
      setError('Please enter denominator');
      return;
    }

    if (number > total) {
      setError('Number cannot be greater than total');
      return;
    }

    const result = (number / total) * 100;

    setPercentage(Math.round((result + Number.EPSILON) * 100) / 100);
    setError('');
  };
  return (
    <Stack spacing={2} mx={2} my={5}>
      <Stack spacing={2} direction="row">
        <TextField
          label="Numerator"
          type="number"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
          fullWidth
        />
        <Typography variant="h3">/</Typography>
        <TextField
          label="Denominator"
          type="number"
          value={total}
          onChange={(e) => setTotal(Number(e.target.value))}
          fullWidth
        />
        <Typography variant="h3">=</Typography>
        <TextField
          label="Percentage"
          type="number"
          value={percentage === -1 ? '' : percentage}
          disabled
          fullWidth
          variant="standard"
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
      </Stack>
      <Button variant="contained" onClick={calculatePercentage}>
        Calculate
      </Button>
      {error && (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      )}
    </Stack>
  );
};

export default PercentageCalculator;
