
import React,{useState}  from "react";
import ct from "countries-and-timezones";
//const ct = require('countries-and-timezones');
import { Button, Stack, TextField, Typography, useTheme } from "@mui/material";
import {Dayjs} from 'dayjs';
//import moment from "moment";
//import mt from 'moment-timezone';
//var utc = require('dayjs/plugin/utc')
// type x=Dayjs & any;
// x.extend(utc)
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MenuItem from '@mui/material/MenuItem';
//import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
//import format from 'dayjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
//var timezone = require('dayjs/plugin/timezone') 
import { Console } from "console";
//import dayjsPluginUTC from 'dayjs-plugin-utc';
dayjs().format();
dayjs.extend(utc);
dayjs.extend(timezone)
//var utc = require('dayjs/plugin/utc')
// Dayjs.extend(utc: Dayjs,null );


const TimezoneConverter: React.FC=()=>{
  const theme=useTheme();
  const [givenTime,setgivenTime]=useState<Dayjs | null>(null);
  const [country1,setCountry1]=useState<string>();
  const [country2,setCountry2]=useState<string>();
  const [time1,setTime1]=useState<string>();
  const [time2,setTime2]=useState<string>();
  const [utchrs,setutchrs]=useState<number>(0);
  const [utcmin,setutcmin]=useState<number>(0);
  const countries = ct.getAllCountries();
const countryArray=Object.values(countries);
  
const handleClick=()=>{
 
  if(givenTime!=null)
  {
    console.log(givenTime.toISOString());
    
   var t=givenTime.toISOString();
   var hrs=parseInt(t[11]+t[12]);
   var min=parseInt(t[14]+t[15]);
   console.log(hrs,min);
   setutchrs(hrs);
   setutcmin(min);
   
    // console.log(ct.getTimezone(country1))
    //console.log(givenTime.toUTCString());
  }
  if(country1)
  {
if(givenTime)
   { 
    givenTime.format();
    console.log(givenTime);
    
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@"+dayjs.tz(givenTime.toISOString(), "America/Toronto"));
   console.log(dayjs(dayjs.tz(givenTime.toISOString()).tz("America/Toronto", true)));
  
  }



   console.log("-------------");
   var x=ct.getTimezone(country1[0]);
     if(x)
   {
     console.log(x.utcOffsetStr);
   var t=(x.utcOffsetStr);
 
   if(t[0]==='+')
   { 
    var hrs=parseInt(t[1]+t[2])+utchrs;
    var min=parseInt(t[4]+t[5])+utcmin;
    console.log(hrs,min);
 }
 else{
 var hrs=parseInt(t[1]+t[2])-utchrs;
   var min=parseInt(t[4]+t[5])-utcmin;
   console.log(hrs,min);
 }
   
   }
 
   console.log("-------------");
 }
   
  
  // if(givenTime!=null)
  // {
  //   const x=givenTime.utc().format();
  //   console.log(x);
    
  // }
// console.log(givenTime.getUTCHours());

}

console.log(Object.values(countries)[0].name);
  console.log("working");
  

  return (
  
    <Stack spacing={1} mx={1} my={5} direction={'row'}>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <TimePicker
      label="Select Time"
     // ampm={false}
      renderInput={(params) => <TextField {...params} />}
      value={givenTime}
      onChange={(newValue) => {
        console.log(givenTime);
        
        setgivenTime(newValue);
        console.log(givenTime?.get('minutes'));//for getting the mins for computation in converstion of timezone
        console.log(ct.getTimezone('America/Adak'));
      }}
    />
  </LocalizationProvider>

  <Select
    
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={country1?country1:""}
    label={country1}
    placeholder={country1?country1:"Country"}
    onChange={(e)=>{
      console.log(e.target.value);
      
      setCountry1(e.target.value);
      console.log(country1);
      console.log(country1);
      
      }}
  >
    {countryArray.map((name)=>{
      
      
      return <MenuItem value={name.timezones}>{name.name}</MenuItem>
    })}
   
    {/* <MenuItem value={10}></MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem> */}
  </Select>

  <Select
    
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    // value={country2}
    value={country2?country2:"country"}
    label={country2}
  
    onChange={(e)=>{ setCountry2(e.target.value);
      console.log(country2);
      console.log(country2);
      
      }}
  >
    {countryArray.map((name)=>{
      return <MenuItem value={name.name}>{name.timezones}</MenuItem>
    })}
   
    {/* <MenuItem value={10}></MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem> */}
  </Select>
  {/* <TextField value={country1} onChange={(e)=>{ setCountry1(e.target.value);
  console.log(country1);
  
  }}/>
   <TextField value={country2} onChange={(e)=>{ setCountry2(e.target.value);
  console.log(country2);
  
  }}/> */}
  <button onClick={handleClick}>Convert</button>
   </Stack>
  )
};

export default TimezoneConverter;
