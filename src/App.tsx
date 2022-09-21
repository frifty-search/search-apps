import React, { FormEvent, useState } from "react";
import { Stack, IconButton, TextField, Box } from "@mui/material";
import { Search } from "@mui/icons-material";

import { Main } from "./components/main/main.components";
import { Apps, fetchSearchAPI } from "./utils/api.utils";

type AppState = "start" | "loading" | "loaded" | "error";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<Apps | null>(null);
  const [state, setState] = useState<AppState>("start");

  const handleSumbit = (e: FormEvent) => {
    e.preventDefault();

    setState("loading");
    fetchSearchAPI(searchQuery)
      .then((res) => {
        setData(res);
        setState("loaded");
      })
      .catch((err) => {
        setError(err);
        setState("error");
      });
  };

  return (
    <Box
      sx={{
        m: 5,
        p: 5,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <form
        onSubmit={handleSumbit}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          id="search-bar"
          className="text"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          label="Enter the Query"
          variant="outlined"
          placeholder="Search..."
        />
        <IconButton type="submit" aria-label="search">
          <Search style={{ fill: "blue" }} />
        </IconButton>
      </form>
      {state === "loading" ? (
        <h1>Loading...</h1>
      ) : state === "error" ? (
        <h1>{error?.message}</h1>
      ) : state === "loaded" ? (
        <Main data={data!!} query={searchQuery} />
      ) : (
        <></>
      )}
    </Box>
  );
};

export default App;
