import { Button, Stack, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';

const SipCalculator: React.FC = () => {
  const [values, setValues] = useState({
    principal: 0,
    interestRate: 0,
    timePeriod: 0,
  });

  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  const handleClick = () => {
    const { principal, timePeriod, interestRate } = values;
    if (principal === 0 && timePeriod === 0 && interestRate === 0) {
      setError(`Invested Amount, Time Period and Interest Rate cannot be 0.`);
      return;
    }
    if (principal === 0) {
      setError(`Principal Amount cannot be 0.`);
      return;
    }
    if (timePeriod === 0) {
      setError(`Time Period cannot be 0.`);
      return;
    }
    if (interestRate === 0) {
      setError(`Interest Rate cannot be 0.`);
      return;
    }

    const n = timePeriod * 12;
    const r = interestRate / (12 * 100);

    const sip = Math.round(principal * (1 + r) * (((1 + r) ** n - 1) / r));

    const numberFormat = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumSignificantDigits: 3,
    });

    setError('');
    setResult(`
      Your invested amount is ${numberFormat.format(
        principal * n
      )}. Your total return is ${numberFormat.format(sip)}.
      You earn ${numberFormat.format(sip - principal * n)} in interest`);
  };

  return (
    <Stack spacing={3} mx={1} my={5}>
      <Stack direction="row" spacing={3}>
        <TextField
          fullWidth
          defaultValue={values.principal.toString()}
          label={'Monthly Investment'}
          onChange={handleChange}
          name={'principal'}
          variant={'outlined'}
          required
        />

        <TextField
          fullWidth
          defaultValue={values.interestRate.toString()}
          label={'Annual Interest Rate (in %)'}
          onChange={handleChange}
          name={'interestRate'}
          variant={'outlined'}
          required
        />

        <TextField
          fullWidth
          defaultValue={values.timePeriod.toString()}
          label={'Investment Period in Years'}
          onChange={handleChange}
          name={'timePeriod'}
          variant={'outlined'}
          required
        />
      </Stack>

      <Button
        sx={{ mt: 1, boxShadow: 2 }}
        type="submit"
        variant="outlined"
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
          color="error"
        >
          {error}
        </Typography>
      )}
    </Stack>
  );
};

export default SipCalculator;
