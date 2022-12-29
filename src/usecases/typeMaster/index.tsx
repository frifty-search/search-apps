import React, { useState, useEffect, useRef } from 'react';
import randomWords from 'random-words';
import { Button, Stack, TextField, Typography } from '@mui/material';
const NUMB_OF_WORDS = 200;
const SECONDS = 60;

const TypeMaster: React.FC = () => {
  const [words, setWords] = useState<string[]>([]);
  const [countDown, setCountDown] = useState(SECONDS);
  const [currInput, setCurrInput] = useState('');
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  const [currChar, setCurrChar] = useState('');
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [status, setStatus] = useState('waiting');
  const textInput = useRef(null);

  useEffect(() => {
    setWords(generateWords());
  }, []);

  const generateWords = () => {
    return randomWords({
      exactly: 200,
    });
  };

  const start = () => {
    if (status === 'finished') {
      setWords(generateWords());
      setCurrWordIndex(0);
      setCorrect(0);
      setIncorrect(0);
      setCurrCharIndex(-1);
      setCurrChar('');
    }

    if (status !== 'started') {
      setStatus('started');
      let interval = setInterval(() => {
        setCountDown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(interval);
            setStatus('finished');
            setCurrInput('');
            return SECONDS;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);
    }
  };

  const handleKeyDown = ({
    keyCode,
    key,
  }: {
    keyCode: number;
    key: string;
  }) => {
    // space bar
    if (keyCode === 32) {
      checkMatch();
      setCurrInput('');
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(-1);
      // backspace
    } else if (keyCode === 8) {
      setCurrCharIndex(currCharIndex - 1);
      setCurrChar('');
    } else {
      setCurrCharIndex(currCharIndex + 1);
      setCurrChar(key);
    }
  };

  const checkMatch = () => {
    const wordToCompare = words[currWordIndex];
    const doesItMatch = wordToCompare === currInput.trim();
    if (doesItMatch) {
      setCorrect(correct + 1);
    } else {
      setIncorrect(incorrect + 1);
    }
  };

  const getCharClass = (wordIdx: number, charIdx: number, char: string) => {
    if (
      wordIdx === currWordIndex &&
      charIdx === currCharIndex &&
      currChar &&
      status !== 'finished'
    ) {
      if (char === currChar) {
        return {
          backgroundColor: '#48c78e!important',
        };
      } else {
        return {
          backgroundColor: '#f14668!important',
        };
      }
    } else if (
      wordIdx === currWordIndex &&
      currCharIndex >= words[currWordIndex].length
    ) {
      return {
        backgroundColor: '#f14668!important',
      };
    } else {
      return {
        backgroundColor: '',
      };
    }
  };

  return (
    <Stack spacing={3} mx={2} my={5}>
      <Typography
        variant="h4"
        align="center"
        color={
          countDown > 30 ? 'success' : countDown > 15 ? 'warning' : 'error'
        }
      >
        `` Time Left : {countDown}
      </Typography>
      {status === 'started' && (
        <>
          {words.map((word, i) => (
            <Typography key={i} component={'span'}>
              <Typography>
                {word.split('').map((char, idx) => (
                  <Typography style={getCharClass(i, idx, char)} key={idx}>
                    {char}
                  </Typography>
                ))}
              </Typography>
              <Typography> </Typography>
            </Typography>
          ))}
        </>
      )}
      {status === 'finished' && (
        <Stack
          direction={'row'}
          justifyContent={'space-evenly'}
          alignItems={'center'}
        >
          <Stack
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography variant="h5">Words per minute:</Typography>
            <Typography variant="h3" color="primary">
              {correct}
            </Typography>
          </Stack>

          <Stack
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography variant="h5">Accuracy:</Typography>
            <Typography variant="h3" color="primary">
              {correct !== 0
                ? `${Math.round((correct / (correct + incorrect)) * 100)}%`
                : '0%'}
            </Typography>
          </Stack>
        </Stack>
      )}
      {status === 'started' && (
        <TextField
          inputRef={textInput}
          label="Start typing"
          variant="outlined"
          onKeyDown={handleKeyDown}
          value={currInput}
          onChange={(e) => setCurrInput(e.target.value)}
          focused
        />
      )}
      {status === 'waiting' ? (
        <Button variant="contained" color="primary" onClick={start}>
          Click to start
        </Button>
      ) : status === 'finished' ? (
        <Button variant="contained" color="primary" onClick={start}>
          Click to start again
        </Button>
      ) : null}
    </Stack>
  );
};

export default TypeMaster;
