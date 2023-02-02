import React, { useEffect, useMemo, useRef, useState } from 'react';

import randomWords from 'random-words';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Button,
  useTheme,
  Stack,
} from '@mui/material';

import { createGlobalStyle } from 'styled-components';

const countDownConstant: number = 60;

const lightTheme = {
  label: 'Light',
  background: '#F5F5F5',
  text: '#000000',
  gradient: 'linear-gradient(315deg, #74ebd5 0%, #ACB6E5 94%)',
  title: '#2979ff',
  textTypeBox: '#9E9E9E',
  stats: '#3D5AFE',
  fontFamily: 'sans-serif',
};

export const darkTheme = {
  label: 'Dark',
  background: '#121212',
  text: '#FAFAFA',
  gradient: 'linear-gradient(315deg, #F7971E 0%, #FFD200 94%)',
  title: '#ffc107',
  textTypeBox: '#706d6d',
  stats: '#BB86FC',
  fontFamily: 'sans-serif',
};

type Theme = {
  label: string;
  background: string;
  text: string;
  gradient: string;
  title: string;
  textTypeBox: string;
  stats: string;
  fontFamily: string;
};

const GlobalStyles = createGlobalStyle`
  .canvas {
      align-items: center;
      display: grid;
      grid-auto-flow: row;
      grid-template-rows: auto 1fr auto;
      padding: 1rem;
      postition: absolute;
  }
  .stats {
    display: block;
    min-width: 100%;
    margin-left: auto;
    margin-right: auto;
    color: ${({ theme }: { theme: Theme }) => theme.stats};
  }

  .type-box {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .words{
    color: ${({ theme }: { theme: Theme }) => theme.textTypeBox};
    font-size: 28px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-content: center;
    user-select: none;
  }
  .word{
    margin: 5px 5px;
    display: flex;
    padding-right: 2px;
    border-bottom: 1px solid transparent;
    border-top: 1px solid transparent;
  }
  .active-word{
    animation: blinkingBackground 2s infinite;
    border-top: 1px solid transparent;
    border-bottom: 1px solid;
    @keyframes blinkingBackground{
      0%		{ border-bottom-color: ${({ theme }: { theme: Theme }) => theme.stats};}
      25%		{ border-bottom-color: ${({ theme }: { theme: Theme }) =>
        theme.textTypeBox};}
      50%		{ border-bottom-color: ${({ theme }: { theme: Theme }) =>
        theme.stats};}
      75%		{border-bottom-color: ${({ theme }: { theme: Theme }) =>
        theme.textTypeBox};}
      100%	{border-bottom-color: ${({ theme }: { theme: Theme }) =>
        theme.stats};}
    };
  }
  .error-word{
    border-bottom: 1px solid red;
  }
  .char{
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
  }
  .correct-char{
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    color: ${({ theme }: { theme: Theme }) => theme.text};
  }
  .error-char{
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    color: red;
  }
  .caret-char-left{
    border-left: 1px solid ${({ theme }: { theme: Theme }) => theme.stats};
    border-right: 1px solid transparent;
  }
  .caret-char-left-start{
    border-left: 1px solid;
    border-right: 1px solid transparent;
    animation: blinkingCaretLeft 2s infinite;
    animation-timing-function: ease;
    @keyframes blinkingCaretLeft{
      0%		{ border-left-color: ${({ theme }: { theme: Theme }) => theme.stats};}
      25%		{ border-left-color: ${({ theme }: { theme: Theme }) =>
        theme.textTypeBox};}
      50%		{ border-left-color: ${({ theme }: { theme: Theme }) => theme.stats};}
      75%		{ border-left-color: ${({ theme }: { theme: Theme }) =>
        theme.textTypeBox};}
      100%	{ border-left-color: ${({ theme }: { theme: Theme }) => theme.stats};}
    }
  }
  .caret-char-right{
    border-right: 1px solid ${({ theme }: { theme: Theme }) => theme.stats};
    border-left: 1x solid transparent;
  }
  .caret-char-right-correct{
    color: ${({ theme }: { theme: Theme }) => theme.text};
    border-right: 1px solid ${({ theme }: { theme: Theme }) => theme.stats};
    border-left: 1px solid transparent;
  }
  .caret-char-right-error{
    color: red;
    border-right: 1px solid ${({ theme }: { theme: Theme }) => theme.stats};
    border-left: 1px solid transparent;
  }
  .caret-extra-char-right-error{
    color: red;
    border-right: 1px solid ${({ theme }: { theme: Theme }) => theme.stats};
    border-left: 1px solid transparent;
  }

  .hidden-input{
    opacity:0;
    filter:alpha(opacity=0);
  }
`;

const Stats: React.FC<{
  status: string;
  wpm: number;
  statsCharCount: number[];
  rawKeyStrokes: number;
}> = ({
  status,
  wpm,
  statsCharCount,
  rawKeyStrokes,
}: {
  status: string;
  wpm: number;
  statsCharCount: number[];
  rawKeyStrokes: number;
}) => {
  return (
    <>
      {status === 'finished' && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500, my: 1 }} aria-label="simple table">
            <TableBody>
              <TableRow key={'wpm'}>
                <TableCell component="th" scope="row">
                  Words per minute
                </TableCell>
                <TableCell align="right">{Math.round(wpm)}</TableCell>
              </TableRow>
              <TableRow key={'accuracy'}>
                <TableCell component="th" scope="row">
                  Accuracy
                </TableCell>
                <TableCell align="right">
                  {Math.round(statsCharCount[0])}
                </TableCell>
              </TableRow>
              <TableRow key={'raw-kpm'}>
                <TableCell component="th" scope="row">
                  Raw Keystrokes per minute -
                </TableCell>
                <TableCell align="right">
                  {Math.round((rawKeyStrokes / countDownConstant) * 60.0)}
                </TableCell>
              </TableRow>
              <TableRow key={'total-char'}>
                <TableCell component="th" scope="row">
                  Total Character -
                </TableCell>
                <TableCell align="right">{statsCharCount[4]}</TableCell>
              </TableRow>
              <TableRow key={'correct-char-stats'}>
                <TableCell component="th" scope="row">
                  Correct -
                </TableCell>
                <TableCell align="right">{statsCharCount[1]}</TableCell>
              </TableRow>
              <TableRow key={'incorrect-char-stats'}>
                <TableCell component="th" scope="row">
                  Incorrect -
                </TableCell>
                <TableCell align="right">{statsCharCount[2]}</TableCell>
              </TableRow>
              <TableRow key={'missing-char-stats'}>
                <TableCell component="th" scope="row">
                  Missing -
                </TableCell>
                <TableCell align="right">{statsCharCount[3]}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

const TypeBox: React.FC<{
  textInputRef: any;
}> = ({ textInputRef }: { textInputRef: any }) => {
  const [wordsDict, setWordsDict] = useState(() => {
    return randomWords({
      exactly: 100,
    });
  });

  const words = useMemo(() => {
    return wordsDict.map((e) => e);
  }, [wordsDict]);

  const wordsKey = useMemo(() => {
    return wordsDict.map((e) => e);
  }, [wordsDict]);

  const wordSpanRefs = useMemo(
    () =>
      Array(words.length)
        .fill(0)
        .map((i) => React.createRef() as React.RefObject<HTMLSpanElement>),
    [words]
  );

  // set up timer state
  const [countDown, setCountDown] = useState(60);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  // set up game loop status state
  const [status, setStatus] = useState('waiting');

  // set up hidden input input val state
  const [currInput, setCurrInput] = useState('');
  // set up world advancing index
  const [currWordIndex, setCurrWordIndex] = useState(0);
  // set up char advancing index
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  const [prevInput, setPrevInput] = useState('');

  // set up words examine history
  const [wordsCorrect, setWordsCorrect] = useState(new Set());
  const [wordsInCorrect, setWordsInCorrect] = useState(new Set());
  const [inputWordsHistory, setInputWordsHistory] = useState<{
    [key: number]: string;
  }>({});

  // setup stats
  const [rawKeyStrokes, setRawKeyStrokes] = useState(0);
  const [wpmKeyStrokes, setWpmKeyStrokes] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [statsCharCount, setStatsCharCount] = useState<number[]>([]);

  // set up char examine hisotry
  const [history, setHistory] = useState<{
    [key: string]: boolean | undefined | number;
  }>({});
  const keyString = currWordIndex + '.' + currCharIndex;
  const [currChar, setCurrChar] = useState('');

  // Caps Lock
  const [capsLocked, setCapsLocked] = useState(false);

  // tab-enter restart dialog
  const [openRestart, setOpenRestart] = useState(false);

  useEffect(() => {
    if (
      currWordIndex !== 0 &&
      wordSpanRefs[currWordIndex].current!.offsetLeft <
        wordSpanRefs[currWordIndex - 1].current!.offsetLeft
    ) {
      wordSpanRefs[currWordIndex - 1].current!.scrollIntoView(false);
    } else {
      return;
    }
  }, [currWordIndex, wordSpanRefs]);

  const EnterkeyPressReset = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // press enter/or tab to reset;
    if (e.keyCode === 13 || e.keyCode === 9) {
      e.preventDefault();
      setOpenRestart(false);
      reset(countDownConstant, false);
    } // press space to redo
    else if (e.keyCode === 32) {
      e.preventDefault();
      setOpenRestart(false);
      reset(countDownConstant, true);
    } else {
      e.preventDefault();
      setOpenRestart(false);
    }
  };

  const reset = (newCountDown: number, isRedo: boolean) => {
    setStatus('waiting');
    if (!isRedo) {
      setWordsDict(() => {
        return randomWords({
          exactly: 100,
        });
      });
    }

    setCountDown(newCountDown);
    clearInterval(intervalId!);
    setWpm(0);
    setRawKeyStrokes(0);
    setWpmKeyStrokes(0);
    setCurrInput('');
    setPrevInput('');
    setIntervalId(null);
    setCurrWordIndex(0);
    setCurrCharIndex(-1);
    setCurrChar('');
    setHistory({});
    setInputWordsHistory({});
    setWordsCorrect(new Set());
    setWordsInCorrect(new Set());
    textInputRef.current.focus();
    // console.log("fully reset waiting for next inputs");
    wordSpanRefs[0].current!.scrollIntoView(false);
  };

  const start = () => {
    if (status === 'finished') {
      setCurrInput('');
      setPrevInput('');
      setCurrWordIndex(0);
      setCurrCharIndex(-1);
      setCurrChar('');
      setHistory({});
      setInputWordsHistory({});
      setWordsCorrect(new Set());
      setWordsInCorrect(new Set());
      setStatus('waiting');
      textInputRef.current.focus();
    }

    if (status !== 'started') {
      setStatus('started');
      let intervalId = setInterval(() => {
        setCountDown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(intervalId);
            // current total extra inputs char count
            const currCharExtraCount = Object.values(history)
              .filter((e) => typeof e === 'number')
              .reduce((a, b) => (a as number) + (b as number), 0) as number;

            // current correct inputs char count
            const currCharCorrectCount = Object.values(history).filter(
              (e) => e === true
            ).length;

            // current correct inputs char count
            const currCharIncorrectCount = Object.values(history).filter(
              (e) => e === false
            ).length;

            // current missing inputs char count
            const currCharMissingCount = Object.values(history).filter(
              (e) => e === undefined
            ).length;

            // current total advanced char counts
            const currCharAdvancedCount =
              currCharCorrectCount +
              currCharMissingCount +
              currCharIncorrectCount;

            // When total inputs char count is 0,
            // that is to say, both currCharCorrectCount and currCharAdvancedCount are 0,
            // accuracy turns out to be 0 but NaN.
            const accuracy =
              currCharCorrectCount === 0
                ? 0
                : (currCharCorrectCount / currCharAdvancedCount) * 100;

            setStatsCharCount([
              accuracy,
              currCharCorrectCount,
              currCharIncorrectCount,
              currCharMissingCount,
              currCharAdvancedCount,
              currCharExtraCount,
            ]);

            checkPrev();
            setStatus('finished');

            return countDownConstant;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);
      setIntervalId(intervalId);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setCapsLocked(e.getModifierState('CapsLock'));
  };

  const handleTabKeyOpen = () => {
    setOpenRestart(true);
  };

  const UpdateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (status === 'finished') {
      return;
    }
    setCurrInput(e.target.value);
    inputWordsHistory[currWordIndex] = e.target.value.trim();
    setInputWordsHistory(inputWordsHistory);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    const keyCode = e.keyCode;

    // keydown count for KPM calculations to all types of operations
    if (status === 'started') {
      setRawKeyStrokes(rawKeyStrokes + 1);
      if (keyCode >= 65 && keyCode <= 90) {
        setWpmKeyStrokes(wpmKeyStrokes + 1);
      }
    }

    // disable shift alt ctrl
    if (keyCode >= 16 && keyCode <= 18) {
      e.preventDefault();
      return;
    }

    if (status === 'finished') {
      setCurrInput('');
      setPrevInput('');
      return;
    }

    // update stats when typing unless there is no effective wpm
    if (wpmKeyStrokes !== 0) {
      const currWpm =
        (wpmKeyStrokes / 5 / (countDownConstant - countDown)) * 60.0;
      setWpm(currWpm);
    }

    // start the game by typing any thing
    if (status !== 'started' && status !== 'finished') {
      start();
    }

    // space bar
    if (keyCode === 32) {
      const prevCorrectness = checkPrev();
      // advance to next regardless prev correct/not
      if (prevCorrectness === true || prevCorrectness === false) {
        // reset currInput
        setCurrInput('');
        // advance to next
        setCurrWordIndex(currWordIndex + 1);
        setCurrCharIndex(-1);
        return;
      } else {
        // but don't allow entire word skip
        // console.log("entire word skip not allowed");
        return;
      }

      // backspace
    } else if (keyCode === 8) {
      // delete the mapping match records
      delete history[keyString];

      // avoid over delete
      if (currCharIndex < 0) {
        // only allow delete prev word, rewind to previous
        if (wordsInCorrect.has(currWordIndex - 1)) {
          // console.log("detected prev incorrect, rewinding to previous");
          const prevInputWord = inputWordsHistory[currWordIndex - 1];
          // console.log(prevInputWord + " ")
          setCurrInput(prevInputWord + ' ');
          setCurrCharIndex(prevInputWord.length - 1);
          setCurrWordIndex(currWordIndex - 1);
          setPrevInput(prevInputWord);
        }
        return;
      }
      setCurrCharIndex(currCharIndex - 1);
      setCurrChar('');
      return;
    } else {
      setCurrCharIndex(currCharIndex + 1);
      setCurrChar(key);
      return;
      // if (keyCode >= 65 && keyCode <= 90) {
      //   setCurrCharIndex(currCharIndex + 1);
      //   setCurrChar(key);
      // } else {
      //   return;
      // }
    }
  };

  const getExtraCharClassName = (i: number, idx: number, extra: string[]) => {
    if (currWordIndex === i && idx === extra.length - 1) {
      return 'caret-extra-char-right-error';
    }
    return 'error-char';
  };

  const getExtraCharsDisplay = (word: string, i: number) => {
    let input = inputWordsHistory[i];
    if (!input) {
      input = currInput.trim();
    }
    if (i > currWordIndex) {
      return null;
    }
    if (input.length <= word.length) {
      return null;
    } else {
      const extra = input.slice(word.length, input.length).split('');
      history[i] = extra.length;
      return extra.map((c, idx) => (
        <span key={idx} className={getExtraCharClassName(i, idx, extra)}>
          {c}
        </span>
      ));
    }
  };

  const checkPrev = () => {
    const wordToCompare = words[currWordIndex];
    const currInputWithoutSpaces = currInput.trim();
    const isCorrect = wordToCompare === currInputWithoutSpaces;
    if (!currInputWithoutSpaces || currInputWithoutSpaces.length === 0) {
      return null;
    }
    if (isCorrect) {
      // console.log("detected match");
      wordsCorrect.add(currWordIndex);
      wordsInCorrect.delete(currWordIndex);
      let inputWordsHistoryUpdate = { ...inputWordsHistory };
      inputWordsHistoryUpdate[currWordIndex] = currInputWithoutSpaces;
      setInputWordsHistory(inputWordsHistoryUpdate);
      // reset prevInput to empty (will not go back)
      setPrevInput('');

      // here count the space as effective wpm.
      setWpmKeyStrokes(wpmKeyStrokes + 1);
      return true;
    } else {
      // console.log("detected unmatch");
      wordsInCorrect.add(currWordIndex);
      wordsCorrect.delete(currWordIndex);
      let inputWordsHistoryUpdate = { ...inputWordsHistory };
      inputWordsHistoryUpdate[currWordIndex] = currInputWithoutSpaces;
      setInputWordsHistory(inputWordsHistoryUpdate);
      // append currInput to prevInput
      setPrevInput(prevInput + ' ' + currInputWithoutSpaces);
      return false;
    }
  };

  const getWordClassName = (wordIdx: number) => {
    if (wordsInCorrect.has(wordIdx)) {
      if (currWordIndex === wordIdx) {
        return 'word error-word active-word';
      }
      return 'word error-word';
    } else {
      if (currWordIndex === wordIdx) {
        return 'word active-word';
      }
      return 'word';
    }
  };

  const getCharClassName = (
    wordIdx: number,
    charIdx: number,
    char: string,
    word: string
  ) => {
    const keyString = wordIdx + '.' + charIdx;
    if (
      wordIdx === currWordIndex &&
      charIdx === currCharIndex + 1 &&
      status !== 'finished'
    ) {
      return 'caret-char-left';
    }
    if (history[keyString] === true) {
      if (
        wordIdx === currWordIndex &&
        word.length - 1 === currCharIndex &&
        charIdx === currCharIndex &&
        status !== 'finished'
      ) {
        return 'caret-char-right-correct';
      }
      return 'correct-char';
    }
    if (history[keyString] === false) {
      if (
        wordIdx === currWordIndex &&
        word.length - 1 === currCharIndex &&
        charIdx === currCharIndex &&
        status !== 'finished'
      ) {
        return 'caret-char-right-error';
      }
      return 'error-char';
    }
    if (
      wordIdx === currWordIndex &&
      charIdx === currCharIndex &&
      currChar &&
      status !== 'finished'
    ) {
      if (char === currChar) {
        history[keyString] = true;
        return 'correct-char';
      } else {
        history[keyString] = false;
        return 'error-char';
      }
    } else {
      if (wordIdx < currWordIndex) {
        // missing chars
        history[keyString] = undefined;
      }

      return 'char';
    }
  };
  return (
    <>
      <Stack
        direction={'row'}
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Typography variant="h3" textAlign={'center'}>
          {countDown} s{' '}
        </Typography>
        <Button
          aria-label="redo"
          color="secondary"
          size="medium"
          onClick={() => {
            reset(countDownConstant, true);
          }}
          variant="contained"
        >
          Redo
        </Button>
        <Button
          aria-label="restart"
          color="secondary"
          size="medium"
          onClick={() => {
            reset(countDownConstant, false);
          }}
          variant="contained"
        >
          Restart
        </Button>
      </Stack>
      <div className="type-box">
        <div className="words">
          {words.map((word, i) => (
            <span key={i} ref={wordSpanRefs[i]} className={getWordClassName(i)}>
              {word.split('').map((char, idx) => (
                <span
                  key={'word' + idx}
                  className={getCharClassName(i, idx, char, word)}
                >
                  {char}
                </span>
              ))}
              {getExtraCharsDisplay(word, i)}
            </span>
          ))}
        </div>
      </div>

      <div className="stats">
        <Stats
          status={status}
          wpm={wpm}
          statsCharCount={statsCharCount}
          rawKeyStrokes={rawKeyStrokes}
        />
      </div>
      <input
        key="hidden-input"
        ref={textInputRef}
        type="text"
        className="hidden-input"
        onKeyDown={(e) => handleKeyDown(e)}
        onKeyUp={(e) => handleKeyUp(e)}
        value={currInput}
        onChange={(e) => UpdateInput(e)}
      />
    </>
  );
};

const TypeMaster: React.FC = () => {
  const theme = useTheme();

  const textInputRef = useRef<HTMLSpanElement>(null);
  const focusTextInput = () => {
    textInputRef.current && textInputRef.current.focus();
  };

  return (
    <>
      <GlobalStyles
        theme={theme.palette.mode === 'dark' ? darkTheme : lightTheme}
      />
      <div className="canvas" onClick={focusTextInput}>
        <TypeBox textInputRef={textInputRef} key="type-box" />
      </div>
    </>
  );
};

export default TypeMaster;
