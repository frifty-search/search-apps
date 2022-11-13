import React, { ChangeEvent, useState } from 'react';
import {
  Button,
  Stack,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
const CompoundInterestCalculator: React.FC = () => {
  const options = [
    {
      value: '12',
      label: 'Monthly',
    },
    {
      value: '4',
      label: 'Quaterly',
    },
    {
      value: '2',
      label: 'Half Yearly',
    },
    {
      value: '1',
      label: 'Annually',
    },
  ];

  const [values, setValues] = useState({
    principal: 0,
    interestRate: 0,
    paymentFrequency: parseFloat(options[3].value),
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

  const handleFrequencyPayment = (e: SelectChangeEvent) => {
    setValues({
      ...values,
      paymentFrequency: parseFloat(e.target.value),
    });
  };

  const handleClick = () => {
    const { principal, timePeriod, interestRate, paymentFrequency } = values;
    if (
      principal === 0 &&
      timePeriod === 0 &&
      interestRate === 0 &&
      paymentFrequency === 0
    ) {
      setError(
        `Principal Amount, Loan Tenure, Payment Frequency and Interest Rate cannot be 0.`
      );
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

    if (paymentFrequency === 0) {
      setError(`Payment Frequency cannot be 0.`);
      return;
    }

    const i = interestRate / 100;

    const power = paymentFrequency * timePeriod;

    const amount = principal * Math.pow(1 + i / paymentFrequency, power);

    const numberFormat = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    });
    setError('');
    console.log(amount);
    setResult(
      `At the end of ${timePeriod} years,
      the principal would have become ${numberFormat.format(
        amount
      )}. The interest amount would be ${numberFormat.format(
        amount - principal
      )}.`
    );
  };

  return (
    <Stack spacing={3} mx={1} my={5}>
      <Stack direction="row" spacing={3}>
        <TextField
          fullWidth
          value={values.principal.toString()}
          label={'Principal Amount'}
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
      </Stack>
      <Stack direction="row" spacing={3}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Compounding Frequency
          </InputLabel>
          <Select
            labelId={'demo-simple-select-label'}
            id={'demo-simple-select'}
            value={values.paymentFrequency.toString()}
            onChange={handleFrequencyPayment}
            label={'Compounding Frequency'}
          >
            {options.map((option) => (
              <MenuItem value={option.value} key={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          defaultValue={values.timePeriod.toString()}
          label={'Compounding Period in Years'}
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

export default CompoundInterestCalculator;
