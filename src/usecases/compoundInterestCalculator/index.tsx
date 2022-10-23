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
  const [compound_amt, setCompound_amt] = useState<number>();
  const handleClick = () => {
    var t = parseInt(time);
    var p = parseInt(principal);
    var i = parseFloat(interest);
    var cp_int = p * (1 + i);
    cp_int = Math.pow(cp_int, t);
    setCompound_amt(cp_int);
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
    </Stack>
  );
};

export default CompoundInterestCalculator;
