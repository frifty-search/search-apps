import React, { useState } from 'react';
import { Button, Stack, TextField, Typography, useTheme } from '@mui/material';

const LoveCalculator: React.FC = () => {
  const [error, setError] = useState('');
  const [result, setResult] = useState(0);
  const [value, setValue] = useState({
    name1: '',
    name2: '',
  });

  const theme = useTheme();

  const loveStatements = (lovePercentage: number) => {
    if (lovePercentage > 90) {
      return 'Your love burns as hot as the sun, blazing through the vastness of space, and searing itself into your being.';
    }
    if (lovePercentage > 80) {
      return 'Your love is as strong as that between an owner and their pet! Unyielding in its loyalty and comfort, albeit with less than optimal odors';
    }
    if (lovePercentage > 70) {
      return "There's probably something there. Just make sure your presence is known so your feelings don't get trampled like a 4ft 8in NBA player.";
    }
    return 'Your love is as strong as the love between most children and their vegetables: imaginary.';
  };

  const handleClick = () => {
    if (value.name1 === '' || value.name2 === '') {
      setError('Please enter both names');
      setResult(0);
      return;
    }

    const combinedNames = value.name1 + value.name2;

    const lowerNames = combinedNames.toLowerCase();

    const t = lowerNames.split('t').length - 1;
    const r = lowerNames.split('r').length - 1;
    const u = lowerNames.split('u').length - 1;
    const e1 = lowerNames.split('e').length - 1;
    let firstDigit = t + r + u + e1;

    if (firstDigit < 5) {
      firstDigit += 5;
    }

    const l = lowerNames.split('l').length - 1;
    const o = lowerNames.split('o').length - 1;
    const v = lowerNames.split('v').length - 1;
    const e2 = lowerNames.split('e').length - 1;
    const secondDigit = l + o + v + e2;

    let lovePercentage = firstDigit * 10 + secondDigit;

    if (lovePercentage > 100) {
      lovePercentage = 94;
    } else if (lovePercentage < 70) {
      lovePercentage = Math.floor(((70 - 12) / 10) * Math.PI + 70);
    }
    setResult(lovePercentage);
    setError('');
  };

  return (
    <Stack spacing={3} mx={2} my={5}>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <TextField
          label="Your Name"
          value={value.name1}
          onChange={(e) => {
            setValue({ ...value, name1: e.target.value });
          }}
          fullWidth
        />
        <TextField
          label="Partner Name"
          value={value.name2}
          onChange={(e) => {
            setValue({ ...value, name2: e.target.value });
          }}
          fullWidth
        />
      </Stack>

      <Button
        sx={{ mt: 1, mr: 1, boxShadow: 2 }}
        type="submit"
        variant="outlined"
        onClick={handleClick}
      >
        Calculate
      </Button>
      {result !== 0 && (
        <Typography
          variant="h6"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'center',
          }}
        >
          You Both are {result}% compatible.
          <br />
          {loveStatements(result)}
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

export default LoveCalculator;
