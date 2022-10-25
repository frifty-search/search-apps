import React, { useState } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';

const CgpaToPercentage: React.FC = () => {
  const [cgpa, setCgpa] = useState<string>('0');
  const [percentage, setPercentage] = useState<string>('0');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const handleClick = () => {
    if (cgpa === '0') {
      setError('Enter a valid CGPA');
      return;
    }
    var current_cg = parseFloat(cgpa);
    var percent = current_cg * 9.5;
    setPercentage(percentage);
    setError('');
    setResult(`${current_cg} CGPA will be ${percent.toFixed(2)} %`);
    return;
  };
  return (
    <Stack spacing={3} mx={1} my={5}>
      <Stack spacing={3} direction={'row'}>
        <TextField
          id="cgpa"
          label="CGPA"
          value={cgpa}
          fullWidth
          onChange={(e) => {
            setCgpa(e.target.value);
          }}
          variant="outlined"
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

export default CgpaToPercentage;
