import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const PercentageCalculator: React.FC = () => {
  const [percentage, setPercentage] = useState<number>(-1);
  const [number, setNumber] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const calculatePercentage = () => {
    if (number === 0 || total === 0) {
      setError("Please enter a number");
      return;
    }
    if (number > total) {
      setError("Number cannot be greater than total");
      return;
    }

    const result = (number / total) * 100;

    setPercentage(Math.round((result + Number.EPSILON) * 100) / 100);
    setError("");
    return;
  };
  return (
    <Stack spacing={2} mx={2} my={5}>
      <Stack spacing={2} direction="row">
        <TextField
          label="Number"
          type="number"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
          fullWidth
        />
        <TextField
          label="Total"
          type="number"
          value={total}
          onChange={(e) => setTotal(Number(e.target.value))}
          fullWidth
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
      {percentage !== -1 && (
        <Typography variant="body1">
          {number} is {percentage}% of {total}
        </Typography>
      )}
    </Stack>
  );
};

export default PercentageCalculator;
