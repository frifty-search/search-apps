import { Search } from '@mui/icons-material';
import { Autocomplete, IconButton, TextField } from '@mui/material';
import { matchSorter } from 'match-sorter';
import React, { ChangeEventHandler } from 'react';

type SearchBoxProps = {
  handleSumbit: (e: React.FormEvent) => void;
  onChange: (e: React.SyntheticEvent, value: string, reason: string) => void;
  label: string;
  placeholder: string;
  options: string[];
};

export const SearchBox: React.FC<SearchBoxProps> = ({
  handleSumbit,
  onChange,
  label,
  placeholder,
  options,
}) => {
  return (
    <form
      onSubmit={handleSumbit}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
      }}
    >
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={[...new Set(options)]}
        placeholder={placeholder}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
            fullWidth
          />
        )}
        onInputChange={onChange}
        fullWidth
      />
      <IconButton type="submit" aria-label="search">
        <Search style={{ fill: 'blue' }} />
      </IconButton>
    </form>
  );
};
