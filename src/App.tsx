import React, { FormEvent, useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { Main } from './components/main/main.components';
import { Apps, fetchSearchAPI, getUsecaseQuery } from './utils/api.utils';
import { SearchBox } from './components/searchBox/searchBox.components';

type AppState = 'start' | 'loading' | 'loaded' | 'error';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<Apps | null>(null);
  const [state, setState] = useState<AppState>('start');
  const [options, setOptions] = useState<string[] | null>(null);

  const handleSumbit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery === '') {
      setError(new Error('Search query cannot be empty'));
      return;
    }

    setState('loading');
    fetchSearchAPI(searchQuery)
      .then((res) => {
        setData(res);
        setState('loaded');
      })
      .catch((err) => {
        setError(err);
        setState('error');
      });
  };

  useEffect(() => {
    getUsecaseQuery()
      .then((queries) => {
        setOptions(queries);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const handleChange = (
    _: React.SyntheticEvent,
    value: string,
    reason: string
  ) => {
    if (reason === 'reset') {
      setSearchQuery(value);
    } else if (reason === 'input') {
      setSearchQuery(value);
    }
  };

  return !options ? null : (
    <Box
      sx={{
        m: 5,
        p: 5,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <SearchBox
        handleSumbit={handleSumbit}
        options={options}
        onChange={handleChange}
        placeholder="Search..."
        label="Enter the Query"
      />
      {state === 'loading' ? (
        <h1>Loading...</h1>
      ) : state === 'error' ? (
        <h1>{error?.message}</h1>
      ) : state === 'loaded' ? (
        <Main data={data!} query={searchQuery} />
      ) : (
        <></>
      )}
    </Box>
  );
};

export default App;
