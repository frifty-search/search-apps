import React, { useState } from "react";
import { Button, Stack, TextField, Typography, useTheme } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DaysDiff: React.FC<{}> = () => {
  const [startDay, setStartDay] = useState<Dayjs>(dayjs());
  const [endDay, setEndDay] = useState<Dayjs>(dayjs());
  const [error, setError] = useState("");
  const [timePeriod, setTimePeriod] = useState("");

  const theme = useTheme();

  const handleStartDayChange = (newValue: Dayjs | null) => {
    if (!newValue) {
      setError("Start date is required");
      setTimePeriod("");
      return;
    }
    setStartDay(newValue.startOf("day"));
    if (newValue.isAfter(endDay)) {
      setError("Start date cannot be after end date");
      setTimePeriod("");
      return;
    } else {
      setError("");
      setTimePeriod("");
    }
  };

  const handleEndDayChange = (newValue: Dayjs | null) => {
    if (newValue === null) {
      setError("End date cannot be empty");
      setTimePeriod("");
      return;
    }
    setEndDay(newValue.startOf("day"));
    if (newValue.isBefore(startDay)) {
      setError("End date cannot be before start date");
      setTimePeriod("");
      return;
    } else {
      setError("");
      setTimePeriod("");
      return;
    }
  };

  const handleClick = () => {
    if (!startDay.isValid() && !endDay.isValid()) {
      setError(`Start Date & End Date are not Valid`);
      return;
    }
    if (!startDay.isValid()) {
      setError(`Start Date is not valid`);
      return;
    }
    if (!endDay.isValid()) {
      setError(`End Date is not valid.`);
      return;
    }
    if (startDay.isAfter(endDay)) {
      setError(`Start Date cannot be after End Date`);
      return;
    }
    let year = endDay.diff(startDay, "year");
    let month: number = 0,
      day: number = 0;
    if (endDay.month() < startDay.month()) {
      year -= 1;
      month = 12 - startDay.month() + endDay.month();
    } else {
      month = endDay.month() - startDay.month();
    }
    if (endDay.date() >= startDay.date()) {
      day = endDay.date() - startDay.date();
    } else {
      month = month - 1;
      day = 31 - startDay.date() + endDay.date();
      if (month === -1) {
        year = year - 1;
        month = 11;
      }
    }
    setError("");
    let timePeriod = ``;
    if (year > 0) {
      timePeriod += `${year} year${year > 1 ? "s" : ""}`;
    }
    if (month > 0) {
      timePeriod += `${year > 0 ? ", " : ""}${month} month${
        month > 1 ? "s" : ""
      }`;
    }
    timePeriod += `${year > 0 || month > 0 ? " and " : ""}${day} day${
      day > 1 ? "s" : ""
    }`;
    setTimePeriod(timePeriod);
  };

  return (
    <Stack spacing={3} mx={2} my={5}>
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date (DD-MM-YYYY)"
            inputFormat="DD-MMM-YYYY"
            value={startDay}
            onChange={handleStartDayChange}
            disableMaskedInput={true}
            renderInput={(params) => (
              <TextField {...params} disabled={true} fullWidth />
            )}
          />
          <DatePicker
            label="End Date (DD-MM-YYYY)"
            inputFormat="DD-MMM-YYYY"
            value={endDay}
            onChange={handleEndDayChange}
            disableMaskedInput={true}
            renderInput={(params) => (
              <TextField {...params} disabled={true} fullWidth />
            )}
          />
        </LocalizationProvider>
      </Stack>

      <Button
        sx={{ mt: 1, mr: 1, boxShadow: 2 }}
        type="submit"
        variant="outlined"
        onClick={handleClick}
      >
        Calculate
      </Button>
      {timePeriod.length !== 0 && (
        <Typography
          variant="h6"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "center",
          }}
        >
          The difference between Start Date and End Date is {timePeriod}.
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

export default DaysDiff;
