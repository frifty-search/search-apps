import React, { ChangeEvent, useState } from 'react';
import {
  Button,
  Stack,
  TextField,
  Typography,
  Switch,
  useTheme,
  Grid,
  Slider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { RadioButtonUnchecked } from '@mui/icons-material';

type HeightType = 'cm' | 'ft';
type WeightType = 'kg' | 'lbs';

type BMIScaleValue = {
  label: string;
  value: number;
};

const BmiCalculator: React.FC<{}> = () => {
  const [error, setError] = useState('');
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0.0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [feetHeight, setFeetHeight] = useState({
    feet: 0,
    inches: 0,
  });
  const [result, setResult] = useState(-1);
  const [weightType, setWeightType] = useState<WeightType>('kg');
  const [heightType, setHeightType] = useState<HeightType>('cm');

  const boysBmi: {
    [key: number]: BMIScaleValue[];
  } = {
    2: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '14.9',
        value: 14.9,
      },
      {
        label: '18.1',
        value: 18.1,
      },
      {
        label: '19.3',
        value: 19.3,
      },
    ],
    3: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '14.4',
        value: 14.4,
      },
      {
        label: '17.4',
        value: 17.4,
      },
      {
        label: '18.3',
        value: 18.3,
      },
    ],
    4: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '14.1',
        value: 14.1,
      },
      {
        label: '17',
        value: 17,
      },
      {
        label: '17.8',
        value: 17.8,
      },
    ],
    5: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '13.9',
        value: 13.9,
      },
      {
        label: '16.8',
        value: 16.8,
      },
      {
        label: '17.9',
        value: 17.9,
      },
    ],
    6: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '13.8',
        value: 13.8,
      },
      {
        label: '17',
        value: 17,
      },
      {
        label: '18.7',
        value: 18.7,
      },
    ],
    7: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '13.8',
        value: 13.8,
      },
      {
        label: '17.5',
        value: 17.5,
      },
      {
        label: '19.5',
        value: 19.5,
      },
    ],
    8: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '13.9',
        value: 13.9,
      },
      {
        label: '17.9',
        value: 17.9,
      },
      {
        label: '20.3',
        value: 20.3,
      },
    ],
    9: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '14',
        value: 14,
      },
      {
        label: '18.5',
        value: 18.5,
      },
      {
        label: '21.3',
        value: 21.3,
      },
    ],
    10: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '14.3',
        value: 14.3,
      },
      {
        label: '19.1',
        value: 19.1,
      },
      {
        label: '22.3',
        value: 22.3,
      },
    ],
    11: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '14.6',
        value: 14.6,
      },
      {
        label: '19.9',
        value: 19.9,
      },
      {
        label: '23.4',
        value: 23.4,
      },
    ],
    12: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '15',
        value: 15,
      },
      {
        label: '20.5',
        value: 20.5,
      },
      {
        label: '24.1',
        value: 24.1,
      },
    ],
    13: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '15.5',
        value: 15.5,
      },
      {
        label: '21.2',
        value: 21.2,
      },
      {
        label: '25',
        value: 25,
      },
    ],
    14: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '16',
        value: 16,
      },
      {
        label: '22',
        value: 22,
      },
      {
        label: '25.9',
        value: 25.9,
      },
    ],
    15: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '16.5',
        value: 16.5,
      },
      {
        label: '22.8',
        value: 22.8,
      },
      {
        label: '26.7',
        value: 26.7,
      },
    ],
    16: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '17',
        value: 17,
      },
      {
        label: '23.6',
        value: 23.6,
      },
      {
        label: '27.6',
        value: 27.6,
      },
    ],
    17: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '17.5',
        value: 17.5,
      },
      {
        label: '24.5',
        value: 24.5,
      },
      {
        label: '28.4',
        value: 28.4,
      },
    ],
    18: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '18',
        value: 18,
      },
      {
        label: '25.3',
        value: 25.3,
      },
      {
        label: '29.1',
        value: 29.1,
      },
    ],
    19: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '18.5',
        value: 18.5,
      },
      {
        label: '26.2',
        value: 26.2,
      },
      {
        label: '29.9',
        value: 29.9,
      },
    ],
    20: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '19.2',
        value: 19.2,
      },
      {
        label: '27.2',
        value: 27.2,
      },
      {
        label: '30.6',
        value: 30.6,
      },
    ],
  };

  const girlsBmi: {
    [key: number]: BMIScaleValue[];
  } = {
    2: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '14.4',
        value: 14.4,
      },
      {
        label: '17.2',
        value: 17.2,
      },
      {
        label: '18.9',
        value: 18.9,
      },
    ],
    3: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '14',
        value: 14,
      },
      {
        label: '16.3',
        value: 16.3,
      },
      {
        label: '18.2',
        value: 18.2,
      },
    ],
    4: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '13.7',
        value: 13.7,
      },
      {
        label: '15.9',
        value: 15.9,
      },
      {
        label: '18',
        value: 18,
      },
    ],
    5: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '13.5',
        value: 13.5,
      },
      {
        label: '15.8',
        value: 15.8,
      },
      {
        label: '18.1',
        value: 18.1,
      },
    ],
    6: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '13.4',
        value: 13.4,
      },
      {
        label: '16.1',
        value: 16.1,
      },
      {
        label: '19',
        value: 19,
      },
    ],
    7: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '13.5',
        value: 13.5,
      },
      {
        label: '17.6',
        value: 17.6,
      },
      {
        label: '19.9',
        value: 19.9,
      },
    ],
    8: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '13.7',
        value: 13.7,
      },
      {
        label: '18.5',
        value: 18.5,
      },
      {
        label: '20.9',
        value: 20.9,
      },
    ],
    9: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '13.9',
        value: 13.9,
      },
      {
        label: '19.3',
        value: 19.3,
      },
      {
        label: '22',
        value: 22,
      },
    ],
    10: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '14.3',
        value: 14.3,
      },
      {
        label: '20',
        value: 20,
      },
      {
        label: '23.1',
        value: 23.1,
      },
    ],
    11: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '14.6',
        value: 14.6,
      },
      {
        label: '20.9',
        value: 20.9,
      },
      {
        label: '24.2',
        value: 24.2,
      },
    ],
    12: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '15',
        value: 15,
      },
      {
        label: '21.6',
        value: 21.6,
      },
      {
        label: '25.3',
        value: 25.3,
      },
    ],
    13: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '15.3',
        value: 15.3,
      },
      {
        label: '22.4',
        value: 22.4,
      },
      {
        label: '26.4',
        value: 26.4,
      },
    ],
    14: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '15.7',
        value: 15.7,
      },
      {
        label: '23.2',
        value: 23.2,
      },
      {
        label: '27.4',
        value: 27.4,
      },
    ],
    15: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '16.1',
        value: 16.1,
      },
      {
        label: '23.9',
        value: 23.9,
      },
      {
        label: '28.4',
        value: 28.4,
      },
    ],
    16: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '16.5',
        value: 16.5,
      },
      {
        label: '24.6',
        value: 24.6,
      },
      {
        label: '29.3',
        value: 29.3,
      },
    ],
    17: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '16.9',
        value: 16.9,
      },
      {
        label: '25.3',
        value: 25.3,
      },
      {
        label: '30.1',
        value: 30.1,
      },
    ],
    18: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '17.3',
        value: 17.3,
      },
      {
        label: '25.9',
        value: 25.9,
      },
      {
        label: '30.8',
        value: 30.8,
      },
    ],
    19: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '17.7',
        value: 17.7,
      },
      {
        label: '26.4',
        value: 26.4,
      },
      {
        label: '31.4',
        value: 31.4,
      },
    ],
    20: [
      {
        label: '0',
        value: 0,
      },
      {
        label: '18',
        value: 18,
      },
      {
        label: '26.6',
        value: 26.6,
      },
      {
        label: '31.8',
        value: 31.8,
      },
    ],
  };

  const [bmiType, setBmiType] = useState<BMIScaleValue[] | null>(null);

  const findBMIScale = (age: number, gender: string): BMIScaleValue[] => {
    if (age > 20) {
      return [
        {
          value: 0,
          label: '0',
        },
        {
          value: 18.5,
          label: '18.5',
        },
        {
          value: 25,
          label: '25',
        },
        {
          value: 30,
          label: '30',
        },
      ];
    }

    if (gender === 'Male') return boysBmi[Math.round(age)];

    return girlsBmi[Math.round(age)];
  };

  const theme = useTheme();

  const bmiTypeCalculator = (bmi: number): string => {
    const values = bmiType!.map((v) => v.value);
    if (bmi < values[1]) {
      return `${bmi.toFixed(2)} - Underweight`;
    } else if (bmi < values[2]) {
      return `${bmi.toFixed(2)} - Normal`;
    } else if (bmi < values[3]) {
      return `${bmi.toFixed(2)} - Overweight`;
    }
    return `${bmi.toFixed(2)} - Obese`;
  };

  const handleClick = () => {
    if (weight === 0) {
      setError('Weight cannot be 0.');
      setResult(-1);
      return;
    }

    if (heightType === 'cm' && height === 0) {
      setError('Height cannot be 0');
      setResult(-1);
      return;
    }

    if (
      heightType === 'ft' &&
      (feetHeight.feet === 0 || feetHeight.inches === 0)
    ) {
      setError('Height cannot be 0');
      setResult(-1);
      return;
    }

    if (age === 0) {
      setError('Age cannot be 0');
      setResult(-1);
      return;
    }

    if (gender.length === 0) {
      setError('Please select your gender');
      setResult(-1);
      return;
    }

    if (weightType === 'lbs' && heightType === 'ft') {
      const heightFt = feetHeight.feet + feetHeight.inches / 12;
      const bmi = (weight * 703) / (heightFt * heightFt);
      console.log(bmi.toFixed(2));
      setResult(Math.round((bmi + Number.EPSILON) * 100) / 100);
      setBmiType(findBMIScale(age, gender));
      setError('');
    } else if (weightType === 'lbs' && heightType === 'cm') {
      const bmi = weight / 2.205 / ((height / 100) * (height / 100));
      console.log(bmi.toFixed(2));
      setResult(Math.round((bmi + Number.EPSILON) * 100) / 100);
      setBmiType(findBMIScale(age, gender));
      setError('');
    } else if (weightType === 'kg' && heightType === 'ft') {
      const heightFt = feetHeight.feet + feetHeight.inches / 12;
      console.log(heightFt);
      const bmi = weight / ((heightFt / 3.281) * (heightFt / 3.281));
      console.log(bmi.toFixed(2));
      setResult(Math.round((bmi + Number.EPSILON) * 100) / 100);
      setBmiType(findBMIScale(age, gender));
      setError('');
    } else if (weightType === 'kg' && heightType === 'cm') {
      const bmi = weight / ((height / 100) * (height / 100));
      console.log(bmi.toFixed(2));
      setResult(Math.round((bmi + Number.EPSILON) * 100) / 100);
      setBmiType(findBMIScale(age, gender));
      setError('');
    }
    return;
  };

  const handleWeight = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(parseFloat(e.target.value));
  };

  const handleHeight = (e: ChangeEvent<HTMLInputElement>) => {
    setHeight(parseFloat(e.target.value));
  };

  const handleAge = (e: ChangeEvent<HTMLInputElement>) => {
    setAge(parseFloat(e.target.value));
  };

  const handleGender = (e: SelectChangeEvent) => {
    setGender(e.target.value);
  };

  return (
    <Stack spacing={3} mx={3} my={5}>
      <Stack spacing={3} direction={'row'}>
        <TextField
          defaultValue={age.toString()}
          label={'Enter your age'}
          onChange={handleAge}
          name={'age'}
          variant={'outlined'}
          required
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel id="gender-select-label">Gender</InputLabel>
          <Select
            labelId="gender-select-label"
            id="Gender"
            value={gender}
            label={'Select your gender'}
            fullWidth
            onChange={handleGender}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Grid container alignItems={'center'}>
        <Grid item xs={8}>
          <TextField
            defaultValue={weight.toString()}
            label={
              weightType === 'kg'
                ? 'Enter your weight(in kg )?'
                : 'Enter your weight(in lbs)?'
            }
            onChange={handleWeight}
            name={'weight'}
            variant={'outlined'}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography textAlign={'left'}>lb </Typography>
            <Switch
              defaultChecked
              inputProps={{ 'aria-label': 'weight type' }}
              onChange={() => {
                setWeightType(weightType === 'kg' ? 'lbs' : 'kg');
              }}
            />
            <Typography textAlign={'right'}>kg </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Grid container alignItems={'center'}>
        {heightType === 'cm' ? (
          <Grid item xs={8}>
            <TextField
              defaultValue={height.toString()}
              label={'Enter your height(in cm)?'}
              onChange={handleHeight}
              name={'height'}
              variant={'outlined'}
              required
              fullWidth
            />
          </Grid>
        ) : (
          <>
            <Grid item xs={4}>
              <TextField
                defaultValue={feetHeight.feet.toString()}
                label={'Enter your height(in ft)?'}
                onChange={(e) => {
                  setFeetHeight({
                    ...feetHeight,
                    feet: parseFloat(e.target.value),
                  });
                }}
                name={'height-ft'}
                variant={'outlined'}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={4} paddingLeft={1}>
              <TextField
                defaultValue={feetHeight.inches.toString()}
                label={'(in inches)?'}
                onChange={(e) => {
                  setFeetHeight({
                    ...feetHeight,
                    inches: parseFloat(e.target.value),
                  });
                }}
                name={'height-inches'}
                variant={'outlined'}
                required
                fullWidth
              />
            </Grid>
          </>
        )}

        <Grid item xs={1} />
        <Grid item xs={3}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography textAlign={'left'}>ft </Typography>
            <Switch
              defaultChecked
              inputProps={{ 'aria-label': 'height type' }}
              onChange={() => {
                setHeightType(heightType === 'cm' ? 'ft' : 'cm');
              }}
            />
            <Typography textAlign={'right'}>cm </Typography>
          </Stack>
        </Grid>
      </Grid>

      <Button
        sx={{ mt: 1, mr: 1, boxShadow: 2 }}
        type="submit"
        variant="outlined"
        onClick={handleClick}
      >
        Calculate
      </Button>

      {result !== -1 && bmiType !== null && (
        <Slider
          min={6.5}
          max={65.5} // <-- set max
          value={result}
          valueLabelFormat={bmiTypeCalculator}
          valueLabelDisplay="on"
          aria-labelledby="discrete-slider-restrict"
          step={null}
          marks={bmiType}
          sx={{
            color: (theme) => {
              const bmi = bmiTypeCalculator(result);
              if (bmi.includes('Underweight')) {
                return theme.palette.warning.main;
              }
              if (bmi.includes('Normal')) {
                return theme.palette.success.main;
              }
              if (bmi.includes('Overweight')) {
                return theme.palette.warning.main;
              }
              if (bmi.includes('Obese')) {
                return theme.palette.error.main;
              }
            },
            mt: 4,
          }}
        />
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

export default BmiCalculator;
