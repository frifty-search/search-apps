import React, { useState } from "react";
import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

type Movies = {
  name: string;
  year: number;
  actors: string[];
  genres: string[];
  rating: number;
};

type MovieType = "bollywood" | "hollywood";

const generateRandomNumber = (max: number) => {
  return Math.floor(Math.random() * Date.now()) % max;
};

const DumbCharades: React.FC<{
  data: { hollywood: Movies[]; bollywood: Movies[] };
}> = ({ data }: { data: { hollywood: Movies[]; bollywood: Movies[] } }) => {
  console.log(data);
  const { hollywood, bollywood } = data;

  const [movieType, setMovieType] = useState<MovieType>("bollywood");
  const [movie, setMovie] = useState<Movies | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (movieType === "bollywood") {
      setMovie(bollywood[generateRandomNumber(bollywood.length)]);
    } else {
      setMovie(hollywood[generateRandomNumber(hollywood.length)]);
    }
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMovieType((event.target as HTMLInputElement).value as MovieType);
  };

  return (
    <Grid container alignItems="center" justifyContent="space-evenly">
      <Grid item p={1} xs={4}>
        <form onSubmit={handleSubmit}>
          <FormControl sx={{ m: 1 }} variant="standard">
            <FormLabel id="movie-choose">
              <Typography variant="h6">Choose a genre</Typography>
            </FormLabel>
            <RadioGroup
              aria-labelledby="movie-choose"
              name="quiz"
              value={movieType}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="bollywood"
                control={<Radio />}
                label="Bollywood"
              />
              <FormControlLabel
                value="hollywood"
                control={<Radio />}
                label="Hollywood"
              />
            </RadioGroup>
            <Button
              sx={{ mt: 1, mr: 1, boxShadow: 2 }}
              type="submit"
              variant="outlined"
            >
              Generate
            </Button>
          </FormControl>
        </form>
      </Grid>
      <Divider orientation="vertical" flexItem variant="fullWidth" />
      <Grid item p={1} xs={7}>
        {movie && (
          <Typography
            variant="h6"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {movie.name}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default DumbCharades;
