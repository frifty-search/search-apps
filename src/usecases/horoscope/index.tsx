import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { getUsecaseDataFromServer } from '../../utils/api.utils';

const Horoscope: React.FC<{}> = () => {
  const options = [
    { value: '1', label: 'Aries' },
    { value: '2', label: 'Taurus' },
    { value: '3', label: 'Gemini' },
    { value: '4', label: 'Cancer' },
    { value: '5', label: 'Leo' },
    { value: '6', label: 'Virgo' },
    { value: '7', label: 'Libra' },
    { value: '8', label: 'Scorpio' },
    { value: '9', label: 'Sagittarius' },
    { value: '10', label: 'Capricorn' },
    { value: '11', label: 'Aquarius' },
    { value: '12', label: 'Pisces' },
  ];

  const [selectedoptions, setSelectedoptions] = useState<string>(
    options[0].value
  );
  const [data, setData] = useState<{
    [key: string]: string;
  }>({});

  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const date = dayjs().format('YYYY-MM-DD');
    getUsecaseDataFromServer(11, { date }).then((data) => {
      setData(data as { [key: string]: string });
      setResult(data[selectedoptions]);
    });
  }, []);

  const handleZodiacSign = (e: SelectChangeEvent) => {
    setSelectedoptions(e.target.value as string);
    setResult(data[e.target.value as string]);
  };

  return (
    <Box sx={{ width: 1, backgroundColor: 'background.main' }}>
      <Stack spacing={2} alignItems="left" m={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Choose your Zodiac Sign
          </InputLabel>
          <Select
            labelId={'demo-simple-select-label'}
            id={'demo-simple-select'}
            value={selectedoptions}
            onChange={handleZodiacSign}
            label={'Choose your Zodiac Sign'}
          >
            {options.map((option) => (
              <MenuItem value={option.value} key={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {result && (
          <>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 'bold',
                color: 'text.primary',
                textAlign: 'left',
              }}
            >
              {
                options.find((option) => option.value === selectedoptions)!
                  .label
              }
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'justify',
                color: 'text.primary',
              }}
            >
              {result}
            </Typography>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Horoscope;
