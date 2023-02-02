import React, { useState } from 'react';
import { matchSorter } from 'match-sorter';
import {
  Button,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  Autocomplete,
} from '@mui/material';
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
const levels = [
  '',
  'clean air',
  'moderately polluted',
  'unhealthy for sensitive groups',
  'unhealthy',
  'very unhealthy',
  'hazardous to health',
];

const AirPollution: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setResult('');
    const data = (await getUsecaseDataFromServer(13, {
      city,
    })) as AirPollutionResponse;
    console.log(data.airPollution?.main.aqi);

    if (data.error) {
      setError(data.error);
      setResult('');

      return;
    }
    const { airPollution } = data;
    setLoading(false);
    setResult(
      `PM10 score = ${airPollution?.components.pm10}. 
      ` +
        '\n' +
        `This is categorized as  ${levels[airPollution!.main.aqi]} for you.`
    );
    setError('');
  };

  const cities: string[] = [
    'Abohar',
    'Agartala',
    'Ahmedabad',
    'Ahmednagar',
    'Aizawl',
    'Ajmer',
    'Akola',
    'Alappuzha',
    'Aligarh',
    'Amaravati',
    'Ambarnath',
    'Amravati',
    'Amritsar',
    'Amroha',
    'Anand',
    'Anantapur',
    'Anantnag',
    'Arrah',
    'Assam',
    'Aurangabad',
    'Avadi',
    'Bahraich',
    'Bally',
    'Bangalore',
    'Baranagar',
    'Bareilly',
    'Barnala',
    'Bellary',
    'Berhampur',
    'Bhagalpur',
    'Bhalswa',
    'Bhatpara',
    'Bhavnagar',
    'Bhilai',
    'Bhilwara',
    'Bhind',
    'Bhiwandi',
    'Bhiwani',
    'Bhubaneswar',
    'Bhusawal',
    'Bikaner',
    'Bilaspur',
    'Bokaro',
    'Bongaigaon',
    'Burhanpur',
    'Chandigarh',
    'Chennai',
    'Chittoor',
    'Coimbatore',
    'Cuttack',
    'Darbhanga',
    'Davanagere',
    'Dehradun',
    'Dehri',
    'Delhi',
    'Dhanbad',
    'Dhule',
    'Dimapur',
    'Dum',
    'Durg',
    'Durgapur',
    'Etawah',
    'Faridkot',
    'Farrukhabad',
    'Fatehpur',
    'Firozabad',
    'Gama',
    'Gandhidham',
    'Ganganagar',
    'Gangtok',
    'Goa',
    'Gorakhpur',
    'Gulbarga',
    'Guna',
    'Guntakal',
    'Guntur',
    'Gurgaon',
    'Guwahati',
    'Gwalior',
    'Hapur',
    'Haryana',
    'Hoshiarpur',
    'Hosur',
    'Hyderabad',
    'Imphal',
    'Jabalpur',
    'Jalandhar',
    'Jamshedpur',
    'Jat',
    'Jaunpur',
    'Jharkhand',
    'Jind',
    'Jodhpur',
    'Kadapa',
    'Kamarhati',
    'Karawal',
    'Karimnagar',
    'Kashmir',
    'Katni',
    'Kavali',
    'Khammam',
    'Khandwa',
    'Kharagpur',
    'Khora',
    'Kochi',
    'Kolhapur',
    'Kolkata',
    'Kollam',
    'Korba',
    'Kota',
    'Kottayam',
    'Kozhikode',
    'Kulti',
    'Kupwad',
    'Kurnool',
    'Loni',
    'Machilipatnam',
    'Madanapalle',
    'Madhyamgram',
    'Madurai',
    'Mahbubnagar',
    'Majra',
    'Malda',
    'Mathura',
    'Medininagar',
    'Mehsana',
    'Midnapore',
    'MiraBhayandar',
    'Miryalaguda',
    'Moradabad',
    'Morbi',
    'Morena',
    'Motihari',
    'Muktsar',
    'Mumbai',
    'Munger',
    'Muzaffarnagar',
    'Muzaffarpur',
    'Mysore',
    'Nadiad',
    'Nagaland',
    'Nagaon',
    'Naihati',
    'Nanded',
    'Nandyal',
    'Narasaraopet',
    'Navi',
    'Nicobar',
    'Noida',
    'Orai',
    'Pallavaram',
    'Panchkula',
    'Panipat',
    'Panvel',
    'Pathankot',
    'Patiala',
    'Phagwara',
    'Phusro',
    'Port',
    'Puducherry',
    'Raebareli',
    'Raiganj',
    'Raigarh',
    'Raipur',
    'Rajahmundry',
    'Rajpur',
    'Ranchi',
    'Ratlam',
    'Rewari',
    'Rohtak',
    'Rourkela',
    'Sagar',
    'Saharanpur',
    'Salem',
    'Sambalpur',
    'Sambhal',
    'Secunderabad',
    'Sharif',
    'Shimla',
    'Shivpuri',
    'Siliguri',
    'Singrauli',
    'Solapur',
    'Sonipat',
    'Suleman',
    'Sultan',
    'Surendranagar',
    'Tadipatri',
    'Thiruvananthapuram',
    'Tinsukia',
    'Tiruchirappalli',
    'Tiruppur',
    'Udupi',
    'Ujjain',
    'Valsad',
    'Vasco Da Gama',
    'Vellore',
    'Vijayawada',
    'Warangal',
  ];

  return (
    <Stack spacing={3} mx={1} my={5}>
      <Stack spacing={3} direction={'row'}>
        <Autocomplete
          disablePortal
          id="Cities-Prompt"
          options={cities}
          filterOptions={() =>
            matchSorter(cities, city, {
              threshold: matchSorter.rankings.WORD_STARTS_WITH, //ensures that the list displays cities that start with the value(i.e: city) entered in the TextField
            })
          }
          renderInput={(params) => (
            <TextField
              {...params} //cannot use "id" property here as {...params} overrides the "id" property
              label="City Name"
              value={city}
              fullWidth
              onChange={(e) => {
                setCity(e.target.value);
              }}
              variant="outlined"
            />
          )}
        ></Autocomplete>
        {/* <TextField
          id="city"
          label="City Name"
          value={city}
          fullWidth
          onChange={(e) => {
            setCity(e.target.value);
          }}
          variant="outlined"
        /> */}
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
        {loading ? <CircularProgress /> : 'Check Air Quality'}
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
        >
          {error}
        </Typography>
      )}
    </Stack>
  );
};

export default AirPollution;
