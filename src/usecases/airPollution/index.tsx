import React, { useState } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';


  const AirPollution: React.FC = () => {
  const [city,setCity]=useState<string>('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

const handleClick=()=>{
  console.log(city);
  
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


  </Stack>
  );
};




export default AirPollution;
