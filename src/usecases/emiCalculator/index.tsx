import React, { ChangeEvent, useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

const EmiCalculator: React.FC<{}> = () => {
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
    paymentFrequency: parseFloat(options[0].value),
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

  const theme = useTheme();

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

    const n = timePeriod * paymentFrequency;
    const r = interestRate / (paymentFrequency * 100);

    const emi = Math.round((principal * r * (1 + r) ** n) / ((1 + r) ** n - 1));

    const numberFormat = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    });
    setError('');
    setResult(
      `You have to pay ${n} installment(s), each worth ${numberFormat.format(
        emi
      )}.`
    );
  };

  return (
    <Stack spacing={3} mx={1} my={5}>
      <Stack direction="row" spacing={3}>
        <TextField
          fullWidth
          value={values.principal.toString()}
          label={'Principal/Loan Amount'}
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
            Payment Frequency
          </InputLabel>
          <Select
            labelId={'demo-simple-select-label'}
            id={'demo-simple-select'}
            value={values.paymentFrequency.toString()}
            onChange={handleFrequencyPayment}
            label={'Payment Frequency'}
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
          style={{ color: theme.palette.error.main }}
        >
          {error}
        </Typography>
      )}
    </Stack>
  );
};

export default EmiCalculator;
