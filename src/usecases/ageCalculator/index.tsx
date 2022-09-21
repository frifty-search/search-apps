import React, { useState } from "react";
import { Button, Stack, TextField, Typography, useTheme } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const AgeCalculator: React.FC<{}> = () => {
  console.log("AgeCalculator");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [age, setAge] = useState<string>("");
  const [error, setError] = useState<string>("");
  const theme = useTheme();

  const handleChange = (newValue: Dayjs | null) => {
    setDate(newValue);
  };

  const handleClick = () => {
    if (!date) return;

    if (!date.isValid()) {
      setError("Please select a valid date");
      return;
    }
    let year = dayjs().diff(date, "year");
    let month: number = 0,
      day: number = 0;
    if (dayjs().month() < date.month()) {
      month = 12 - date.month() + dayjs().month();
    } else {
      month = dayjs().month() - date.month();
    }
    if (dayjs().date() >= date.date()) {
      day = dayjs().date() - date.date();
    } else {
      month = month - 1;
      day = 31 - date.date() + dayjs().date();
      if (month === 0) {
        year = year - 1;
        month = 11;
      }
    }
    setError("");
    setAge(`${year} years ${month} months ${day} days`);
  };

  return (
    <Stack spacing={3} mx={2} my={5}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date of Birth (DD-MMM-YYYY)"
          inputFormat="DD-MMM-YYYY"
          value={date}
          onChange={handleChange}
          disableMaskedInput={true}
          disableFuture={true}
          renderInput={(params) => <TextField {...params} disabled={true} />}
        />
      </LocalizationProvider>
      <Button
        sx={{ mt: 1, mr: 1, boxShadow: 2 }}
        type="submit"
        variant="outlined"
        onClick={handleClick}
      >
        Calculate
      </Button>
      {age.length !== 0 && (
        <Typography
          variant="h6"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Your age is {age}.
        </Typography>
      )}

      {error.length !== 0 && (
        <Typography
          variant="h6"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          style={{ color: theme.palette.error.main }}
        >
          {error}
        </Typography>
      )}
    </Stack>
  );
};

export default AgeCalculator;
