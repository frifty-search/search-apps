import React, { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DropzoneArea } from 'mui-file-dropzone';
import { saveAs } from 'file-saver';
import { createWorker } from 'tesseract.js';

const ImageToText: React.FC = () => {
  const languageOptions: {
    [key: string]: string;
  } = {
    '': '',
    AFR: 'afr',
    AMH: 'amh',
    ARA: 'ara',
    ASM: 'asm',
    AZE: 'aze',
    AZE_CYRL: 'aze_cyrl',
    BEL: 'bel',
    BEN: 'ben',
    BOD: 'bod',
    BOS: 'bos',
    BUL: 'bul',
    CAT: 'cat',
    CEB: 'ceb',
    CES: 'ces',
    CHI_SIM: 'chi_sim',
    CHI_TRA: 'chi_tra',
    CHR: 'chr',
    CYM: 'cym',
    DAN: 'dan',
    DEU: 'deu',
    DZO: 'dzo',
    ELL: 'ell',
    ENG: 'eng',
    ENM: 'enm',
    EPO: 'epo',
    EST: 'est',
    EUS: 'eus',
    FAS: 'fas',
    FIN: 'fin',
    FRA: 'fra',
    FRK: 'frk',
    FRM: 'frm',
    GLE: 'gle',
    GLG: 'glg',
    GRC: 'grc',
    GUJ: 'guj',
    HAT: 'hat',
    HEB: 'heb',
    HIN: 'hin',
    HRV: 'hrv',
    HUN: 'hun',
    IKU: 'iku',
    IND: 'ind',
    ISL: 'isl',
    ITA: 'ita',
    ITA_OLD: 'ita_old',
    JAV: 'jav',
    JPN: 'jpn',
    KAN: 'kan',
    KAT: 'kat',
    KAT_OLD: 'kat_old',
    KAZ: 'kaz',
    KHM: 'khm',
    KIR: 'kir',
    KOR: 'kor',
    KUR: 'kur',
    LAO: 'lao',
    LAT: 'lat',
    LAV: 'lav',
    LIT: 'lit',
    MAL: 'mal',
    MAR: 'mar',
    MKD: 'mkd',
    MLT: 'mlt',
    MSA: 'msa',
    MYA: 'mya',
    NEP: 'nep',
    NLD: 'nld',
    NOR: 'nor',
    ORI: 'ori',
    PAN: 'pan',
    POL: 'pol',
    POR: 'por',
    PUS: 'pus',
    RON: 'ron',
    RUS: 'rus',
    SAN: 'san',
    SIN: 'sin',
    SLK: 'slk',
    SLV: 'slv',
    SPA: 'spa',
    SPA_OLD: 'spa_old',
    SQI: 'sqi',
    SRP: 'srp',
    SRP_LATN: 'srp_latn',
    SWA: 'swa',
    SWE: 'swe',
    SYR: 'syr',
    TAM: 'tam',
    TEL: 'tel',
    TGK: 'tgk',
    TGL: 'tgl',
    THA: 'tha',
    TIR: 'tir',
    TUR: 'tur',
    UIG: 'uig',
    UKR: 'ukr',
    URD: 'urd',
    UZB: 'uzb',
    UZB_CYRL: 'uzb_cyrl',
    VIE: 'vie',
    YID: 'yid',
  };

  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const [language, setLanguage] = useState<string>('ENG');

  const handleDrop = (files: File[]) => {
    setFiles(files);
  };

  const handleClick = async () => {
    // Resize image

    const [file] = files;
    if (!file) {
      setError('Please select a file');
      return;
    }

    if (language === '' && language in languageOptions) {
      setError('Please select Language');
      return;
    }

    const worker = createWorker({
      logger: (m) => console.log(m),
    });
    await worker.load();
    await worker.loadLanguage(languageOptions[language]);
    await worker.initialize(languageOptions[language]);
    const {
      data: { text },
    } = await worker.recognize(URL.createObjectURL(file));
    await worker.terminate();
    setResult(text);
    setError('');
  };

  return (
    <Stack spacing={3} mx={2} my={5}>
      <DropzoneArea
        acceptedFiles={['image/png', 'image/jpeg', 'image/jpg']}
        filesLimit={1}
        fileObjects={files}
        dropzoneText="Drag and drop a image file here or click"
        onChange={handleDrop}
        showPreviewsInDropzone
        showFileNamesInPreview
        onDropRejected={() => {
          alert('Only png files are accepted');
        }}
      />
      <Stack spacing={3} direction="row">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Language</InputLabel>
          <Select
            labelId={'demo-simple-select-label'}
            id={'demo-simple-select'}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            label={'Language'}
          >
            {Object.keys(languageOptions).map((key) => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Button variant="outlined" onClick={handleClick}>
        Convert to Text
      </Button>
      {error.length !== 0 && (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      )}
      {result.length !== 0 && (
        <>
          <Typography variant="h6" color="primary">
            {result}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              navigator.clipboard.writeText(result);
            }}
          >
            Copy to Clipboard
          </Button>
        </>
      )}
    </Stack>
  );
};

export default ImageToText;
