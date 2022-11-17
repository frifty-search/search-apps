import { Button, Stack, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';

const HomeLoanCalculator: React.FC = () => {
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
      setError(`Principal Amount, Loan Tenure and Interest Rate cannot be 0.`);
      return;
    }
    if (principal === 0) {
      setError(`Principal Amount cannot be 0.`);
      return;
    }
    if (timePeriod === 0) {
      setError(`Loan Tenure cannot be 0.`);
      return;
    }
    if (interestRate === 0) {
      setError(`Interest Rate cannot be 0.`);
      return;
    }

    const n = timePeriod * 12;
    const r = interestRate / (12 * 100);

    const emi = principal * r * ((1 + r) ** n / ((1 + r) ** n - 1));

    const numberFormat = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    });

    setError('');
    setResult(
      `Your total payable amount is ${numberFormat.format(Math.round(emi * n))}.
      Your EMI is ${numberFormat.format(emi)} for ${n} months.
      Total interest payable is ${numberFormat.format(
        Math.round(emi * n - principal)
      )}`
    );
    return;
  };

  return (
    <Stack spacing={3} mx={1} my={5}>
      <Stack direction="row" spacing={3}>
        <TextField
          fullWidth
          defaultValue={values.principal.toString()}
          label={'Loan Amount '}
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
          label={'Loan Tenure in Years'}
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
            textAlign: 'left',
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

export default HomeLoanCalculator;
