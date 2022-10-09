import React, { ChangeEvent, useState } from "react";
import {
  Button,
  Stack,
  TextField,
  Typography,
  Switch,
  useTheme,
  Grid,
  Slider,
} from "@mui/material";

type HeightType = "cm" | "ft";
type WeightType = "kg" | "lbs";

const BmiCalculator: React.FC<{}> = () => {
  const [error, setError] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0.0);
  const [feetHeight, setFeetHeight] = useState({
    feet: 0,
    inches: 0,
  });
  const [result, setResult] = useState(-1);
  const [weightType, setWeightType] = useState<WeightType>("kg");
  const [heightType, setHeightType] = useState<HeightType>("cm");

  const bmiType = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 18.5,
      label: "18.5",
    },
    {
      value: 25,
      label: "25",
    },
    {
      value: 40,
      label: "40",
    },
    {
      value: 60,
      label: "60",
    },
  ];

  const theme = useTheme();

  const bmiTypeCalculator = (bmi: number): string => {
    if (bmi <= 18.4) {
      return "Underweight";
    } else if (bmi > 18.5 && bmi <= 24.9) {
      return "Normal";
    } else if (bmi > 25 && bmi <= 39.9) {
      return "Overweight";
    } else {
      return "Obese";
    }
  };

  const handleClick = () => {
    if (heightType === "cm" && height === 0) {
      setError("Height cannot be 0");
      setResult(-1);
      return;
    }

    if (
      heightType === "ft" &&
      (feetHeight.feet === 0 || feetHeight.inches === 0)
    ) {
      setError("Height cannot be 0");
      setResult(-1);
      return;
    }

    if (weight === 0) {
      setError("Weight cannot be 0.");
      setResult(-1);
      return;
    }
    if (weightType === "lbs" && heightType === "ft") {
      const heightFt = feetHeight.feet + feetHeight.inches / 12;
      const bmi = (weight * 703) / (heightFt * heightFt);
      console.log(bmi.toFixed(2));
      setResult(Math.round((bmi + Number.EPSILON) * 100) / 100);
      setError("");
    } else if (weightType === "lbs" && heightType === "cm") {
      const bmi = weight / 2.205 / ((height / 100) * (height / 100));
      console.log(bmi.toFixed(2));
      setResult(Math.round((bmi + Number.EPSILON) * 100) / 100);
      setError("");
    } else if (weightType === "kg" && heightType === "ft") {
      const heightFt = feetHeight.feet + feetHeight.inches / 12;
      console.log(heightFt);
      const bmi = weight / ((heightFt / 3.281) * (heightFt / 3.281));
      console.log(bmi.toFixed(2));
      setResult(Math.round((bmi + Number.EPSILON) * 100) / 100);
      setError("");
    } else if (weightType === "kg" && heightType === "cm") {
      const bmi = weight / ((height / 100) * (height / 100));
      console.log(bmi.toFixed(2));
      setResult(Math.round((bmi + Number.EPSILON) * 100) / 100);
      setError("");
    }
  };

  const handleWeight = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(parseFloat(e.target.value));
  };

  const handleHeight = (e: ChangeEvent<HTMLInputElement>) => {
    setHeight(parseFloat(e.target.value));
  };

  return (
    <Stack spacing={3} mx={3} my={5}>
      <Grid container alignItems={"center"}>
        <Grid item xs={8}>
          <TextField
            defaultValue={weight.toString()}
            label={
              weightType === "kg"
                ? "Enter your weight(in kg )?"
                : "Enter your weight(in lbs)?"
            }
            onChange={handleWeight}
            name={"weight"}
            variant={"outlined"}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography textAlign={"left"}>lb </Typography>
            <Switch
              defaultChecked
              inputProps={{ "aria-label": "weight type" }}
              onChange={() => {
                setWeightType(weightType === "kg" ? "lbs" : "kg");
              }}
            />
            <Typography textAlign={"right"}>kg </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Grid container alignItems={"center"}>
        {heightType === "cm" ? (
          <Grid item xs={8}>
            <TextField
              defaultValue={height.toString()}
              label={"Enter your height(in cm)?"}
              onChange={handleHeight}
              name={"height"}
              variant={"outlined"}
              required
              fullWidth
            />
          </Grid>
        ) : (
          <>
            <Grid item xs={4}>
              <TextField
                defaultValue={feetHeight.feet.toString()}
                label={"Enter your height(in ft)?"}
                onChange={(e) => {
                  setFeetHeight({
                    ...feetHeight,
                    feet: parseFloat(e.target.value),
                  });
                }}
                name={"height-ft"}
                variant={"outlined"}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={4} paddingLeft={1}>
              <TextField
                defaultValue={feetHeight.inches.toString()}
                label={"(in inches)?"}
                onChange={(e) => {
                  setFeetHeight({
                    ...feetHeight,
                    inches: parseFloat(e.target.value),
                  });
                }}
                name={"height-inches"}
                variant={"outlined"}
                required
                fullWidth
              />
            </Grid>
          </>
        )}

        <Grid item xs={1}></Grid>
        <Grid item xs={3}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography textAlign={"left"}>ft </Typography>
            <Switch
              defaultChecked
              inputProps={{ "aria-label": "height type" }}
              onChange={() => {
                setHeightType(heightType === "cm" ? "ft" : "cm");
              }}
            />
            <Typography textAlign={"right"}>cm </Typography>
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
      {result !== -1 && (
        <Slider
          max={70} // <-- set max
          value={result}
          valueLabelFormat={bmiTypeCalculator}
          valueLabelDisplay="on"
          aria-labelledby="discrete-slider-restrict"
          step={null}
          marks={bmiType}
          sx={{
            color: (theme) => {
              const bmi = bmiTypeCalculator(result);
              if (bmi === "Underweight") {
                return theme.palette.warning.main;
              } else if (bmi === "Normal") {
                return theme.palette.success.main;
              } else if (bmi === "Overweight") {
                return theme.palette.warning.main;
              } else if (bmi === "Obese") {
                return theme.palette.error.main;
              }
            },
          }}
        />
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

export default BmiCalculator;
