import { Search } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import React, { ChangeEventHandler } from "react";

type SearchBoxProps = {
  handleSumbit: (e: React.FormEvent) => void;
  onChange: ChangeEventHandler;
  label: string;
  placeholder: string;
};

export const SearchBox: React.FC<SearchBoxProps> = ({
  handleSumbit,
  onChange,
  label,
  placeholder,
}) => {
  return (
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
        onChange={onChange}
        label={label}
        variant="outlined"
        placeholder={placeholder}
      />
      <IconButton type="submit" aria-label="search">
        <Search style={{ fill: "blue" }} />
      </IconButton>
    </form>
  );
};
