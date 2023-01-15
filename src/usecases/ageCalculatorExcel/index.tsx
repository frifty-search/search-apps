import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';

const AgeCalculatorExcel: React.FC = () => {
  const rows = [
    {
      unit: 'Y',
      meaning: 'Years',
      explanation: 'Number of complete years between the start and end dates.',
    },
    {
      unit: 'M',
      meaning: 'Months',
      explanation: 'Number of complete months between the dates.',
    },
    {
      unit: 'D',
      meaning: 'Days	',
      explanation: 'Number of days between the start date and end date.',
    },
    {
      unit: 'MD',
      meaning: 'Days excluding years and months	',
      explanation: 'The date difference in days, ignoring months and years.',
    },
    {
      unit: 'YD',
      meaning: 'Days excluding years	',
      explanation: 'The date difference in days, ignoring years.',
    },
    {
      unit: 'YM',
      meaning: 'Months excluding days and years	',
      explanation: 'The date difference in months, ignoring days and years.',
    },
  ];
  return (
    <Stack spacing={3} mx={2} my={5}>
      <Typography variant="h5">Calculate age in Excel with DATEDIF</Typography>
      <Typography variant="body1">
        DATEDIF is one of very few undocumented functions in Excel, and because
        it is "hidden" you won't find it on the Formula tab, nor will you get
        any hint on which arguments to enter when you start typing the
        function's name in the formula bar. That is why it's important to know
        the complete syntax of Excel DATEDIF to be able to use it in your
        formulas.
      </Typography>
      <Typography variant="h6">Excel DATEDIF function - syntax</Typography>
      <Typography variant="body1">
        The syntax of the Excel DATEDIF function is as follows:
      </Typography>
      <Box
        component={'div'}
        sx={{
          p: 2,
          border: '1px dashed white',
          justifyContent: 'space-around',
        }}
      >
        DATEDIF(start_date, end_date, unit)
        <Button
          onClick={() => {
            navigator.clipboard.writeText(
              'DATEDIF(start_date, end_date, unit)'
            );
          }}
        >
          Copy to ClipBoard
        </Button>
      </Box>
      <Typography variant="body1">
        All three arguments are required: <br />
        <strong>Start_date</strong> - the initial date of the period you want to
        calculate.
        <br />
        <strong>End_date</strong> - the ending date of the period. <br />
        <strong> Unit </strong> - the time unit to use when calculating the
        difference between two dates. By supplying different units, you can get
        the DATEDIF function to return the date difference in days, months or
        years. Overall, 6 units are available, which are described in the
        following table.
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Unit</TableCell>
              <TableCell align="center">Meaning </TableCell>
              <TableCell align="center">Explanation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.unit}
                </TableCell>
                <TableCell align="center">{row.meaning}</TableCell>
                <TableCell align="center">{row.explanation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6">Excel DATEDIF formula</Typography>
      <Typography variant="body1">
        To get the difference between two dates in Excel, your main job is to
        supply the start and end dates to the DATEDIF function. This can be done
        in various ways, provided that Excel can understand and correctly
        interpret the supplied dates.
        <br />
        <br />
        <strong>Cell references</strong> : The easiest way to make a DATEDIF
        formula in Excel is to input two valid dates in separate cells and refer
        to those cells. For example, the following formula counts the number of
        days between the dates in cells A1 and B1:
        <br />
        =DATEDIF(A1, B1, "d")
        <br />
        <br />
        <strong>Text strings</strong>: Excel understands dates in many text
        formats such as "1-Jan-2023", "1/1/2023", "January 1, 2023", etc. The
        dates as text strings enclosed in quotation marks can be typed directly
        in a formula's arguments. For instance, this is how you can calculates
        the number of months between the specified dates:
        <br />
        =DATEDIF("1/1/2023", "12/31/2025", "m")
        <br />
        <br />
        <strong>Serial numbers </strong> Since Microsoft Excel stores each date
        as a serial number beginning with January 1, 1900, you use numbers
        corresponding to the dates. Although supported, this method is not
        reliable because date numbering varies on different computer systems. In
        the 1900 date system, you can use the below formula to find the number
        of years between two dates, 1-Jan-2023 and 31-Dec-2025:
        <br />
        =DATEDIF(44927,46022, "y")
        <br />
        <br />
      </Typography>
      <Typography variant="h6">Results of other functions</Typography>
      <Typography variant="body1">
        To find out how many days there are between today and 20 May, 2025, this
        is the formula to use. <br />
        =DATEDIF(TODAY(), "5/20/2025", "d")
      </Typography>
      <img
        src="https://cdn.ablebits.com/_img-blog/excel-datedif/excel-datedif-function.png"
        width={'100%'}
      />
      <Typography variant="caption">
        Note: In your formulas, the end date must always be greater than the
        start date, otherwise the Excel DATEDIF function returns the #NUM!
        error.
      </Typography>
    </Stack>
  );
};

export default AgeCalculatorExcel;
