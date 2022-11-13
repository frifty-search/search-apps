import React, { useState } from 'react';
import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const CgpaToPercentage: React.FC = () => {
  const [cgpa, setCgpa] = useState<string>('0');
  const [percentage, setPercentage] = useState<number | null>(null);
  const [error, setError] = useState('');
  const handleClick = () => {
    if (cgpa === '0' || cgpa === '') {
      setError('Enter a valid CGPA');
      setPercentage(null);
      return;
    }
    const current_cg = parseFloat(cgpa);
    const percentage = current_cg * 9.5;
    setPercentage(Math.round((percentage + Number.EPSILON) * 100) / 100);
    setError('');
    return;
  };
  return (
    <Stack spacing={3} mx={1} my={5}>
      <Stack spacing={3} direction={'row'}>
        <TextField
          id="cgpa"
          label="Class X CGPA"
          value={cgpa}
          fullWidth
          onChange={(e) => {
            setCgpa(e.target.value);
          }}
          variant="outlined"
        />
        <Typography variant="h3">=</Typography>

        <TextField
          label="Percentage"
          type="number"
          value={percentage ? percentage : ''}
          disabled
          fullWidth
          variant="standard"
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
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
