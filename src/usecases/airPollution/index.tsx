import React, { useState } from 'react';
import { Button, Stack, TextField, Typography, Box } from '@mui/material';
import { getUsecaseDataFromServer } from '../../utils/api.utils';
type AirPollutionResponse = {
  city: string;
  airPollution: {
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
    dt: number;
  } | null;
  error: string | null;
};
const levels=["","Clean Air","Moderately Polluted","Unhealthy for Sensitive Groups","Unhealthy","Very Unhealthy","Hazardous to Health"];
const colors=["","green","yellow","orange","red","purple","mahroon"];
const AirPollution: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
const[aqi,setAqi]=useState(0);
  const handleClick = async () => {
    const data = (await getUsecaseDataFromServer(
      13,
      {
        city
      }
    )) as AirPollutionResponse;
console.log(data.airPollution?.main.aqi);

    if(data.error) {
      setError(data.error);
      console.log(data.error);
      setResult('');
      
      return;
    } 
    
    setResult(`Air Quality Index of ${city} is ${data.airPollution?.main.aqi}`)
    if(data.airPollution?.main.aqi)
    setAqi(data.airPollution?.main.aqi);
setError('');

    
  }


  return (
    <Stack spacing={3} mx={1} my={5}>
      <Stack spacing={3} direction={'row'}>
        <TextField
          id="city"
          label="City Name"
          value={city}
          fullWidth
          onChange={(e) => {
            // console.log("---",city);
            setCity(e.target.value);
            //console.log(city);
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
        Check
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
          <Box
        component="span"
        sx={{
          display: 'block',
          p: 1,
          m: 1,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ?colors[aqi]:colors[aqi]),
          color: (theme) =>
            theme.palette.mode === 'dark' ? "white" : 'white',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          textAlign:'center',
        }}
      >
        {levels[aqi]}
      </Box>

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

export default AirPollution;
