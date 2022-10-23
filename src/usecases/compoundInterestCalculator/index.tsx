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
const CompoundInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<string>('0');
  const [time, setTime] = useState<string>('0');
  const [interest, setInterest] = useState<string>('0');
  const [frequency, setFrequency] = useState<string>('0');
  const [compound_amt, setCompound_amt] = useState<number>();
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const handleClick = () => {
    var t = parseInt(time);
    var p = parseInt(principal);
    var i = parseFloat(interest);
    var f = parseInt(frequency);
    if (t === 0 && p === 0 && i === 0 && f === 0) {
      setError(
        `Principal Amount,  Time Duration, Interest Frequency and Interest Rate cannot be 0.`
      );
      return;
    }
    if (p === 0) {
      setError(`Principal Amount cannot be 0.`);
      return;
    }
    if (t === 0) {
      setError(`Time Duration cannot be 0.`);
      return;
    }
    if (i === 0) {
      setError(`Interest Rate cannot be 0.`);
      return;
    }

    if (f === 0) {
      setError(`Interest Frequency cannot be 0.`);
      return;
    }
    i /= 100;

    var power = f * t;

    var cp_int = p * Math.pow(1 + i / f, power);

    setCompound_amt(cp_int - p);
    setError('');
    setResult(
      `Compound Interest will be ${cp_int - p} , with net worth ${cp_int}.`
    );
    console.log(compound_amt);

    return;
  };
  return (
    <Stack spacing={3} mx={1} my={5}>
      <Stack spacing={3} direction={'row'}>
        <TextField
          id="principal_amount"
          label="Principal Amount"
          value={principal}
          onChange={(e) => {
            setPrincipal(e.target.value);
          }}
          variant="outlined"
        />
        <TextField
          id="duration"
          label="Time Duration"
          value={time}
          variant="outlined"
          onChange={(e) => {
            setTime(e.target.value);
          }}
        />
        <TextField
          id="interest_rate"
          label="Rate of Interest"
          value={interest}
          variant="outlined"
          onChange={(e) => {
            setInterest(e.target.value);
          }}
        />
        <TextField
          id="frequency"
          label="Compound Interest Frequency Anually"
          value={frequency}
          variant="outlined"
          onChange={(e) => {
            setFrequency(e.target.value);
          }}
        />
      </Stack>
      <Button
        variant="outlined"
        type="submit"
        sx={{
          mt: 1,
          boxShadow: 2,
        }}
        onClick={handleClick}
      >
        Calculate
      </Button>

      {result.length !== 0 && (
        <Typography
          variant="h6"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {result}
        </Typography>
      )}

      {error.length !== 0 && (
        <Typography
          variant="h6"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          //  style={{ color: theme.palette.error.main }}
        >
          {error}
        </Typography>
      )}
    </Stack>
  );
};

export default CompoundInterestCalculator;
