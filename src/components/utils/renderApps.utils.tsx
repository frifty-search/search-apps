import React from 'react';
import {
  DumbCharades,
  AgeCalculator,
  BmiCalculator,
  EmiCalculator,
  DaysDiff,
  DaysDiffFromNow,
  PythonNotebook,
  UnicornDefn,
  LoveCalculator,
  Horoscope,
  TimezoneConverter,
  Unsplash,
  BarcodeGenerator,
  QrcodeGenerator,
  UrlShortner,
  PercentageCalculator,
  PngToJpeg,
  ImageToPdf,
  PhotoResizer,
  CompoundInterestCalculator,
  KrutidevToUnicode,
  Finshots,
  SipCalculator,
  HomeLoanCalculator,
  PhotoSizeReducer,
  ImageToText,
  CgpaToPercentage,
  AirPollution,
  AnandBazaarPatrika,
  GrammarCheck,
  YoutubeDownload,
  WifiTransfer,
  CourierTrack,
  TypeMaster,
  DocToPdf,
  PptToPdf,
  ExcelToPdf,
  AgeCalculatorExcel,
  AgeDiff,
  BirthyearCalculator,
  ChatGpt,
  ImageCreation,
} from '../../usecases';
import { Apps } from '../../utils/api.utils';
import { AppName } from '../../utils/appName.utils';

export const renderApps = ({ appId, data }: Apps): React.ReactNode => {
  switch (appId) {
    case AppName.DUMBCHARADES:
      return <DumbCharades data={data} />;
    case AppName.AGECALCULATOR:
      return <AgeCalculator />;
    case AppName.BMICALCULATOR:
      return <BmiCalculator />;
    case AppName.EMICALCULATOR:
      return <EmiCalculator />;
    case AppName.DAYSDIFF:
      return <DaysDiff />;
    case AppName.DAYSDIFFFROMNOW:
      return <DaysDiffFromNow />;
    case AppName.PYTHONNOTEBOOK:
      return <PythonNotebook data={data} />;
    case AppName.UNICORNDEFN:
      return <UnicornDefn data={data} />;
    case AppName.LOVECALCULATOR:
      return <LoveCalculator />;
    case AppName.HOROSCOPE:
      return <Horoscope />;
    case AppName.TIMEZONECONVERTER:
      return <TimezoneConverter data={data} />;
    case AppName.UNSPLASH:
      return <Unsplash />;
    case AppName.BARCODEGENERATOR:
      return <BarcodeGenerator />;
    case AppName.QRCODEGENERATOR:
      return <QrcodeGenerator />;
    case AppName.URLSHORTNER:
      return <UrlShortner />;
    case AppName.PERCENTAGECALCULATOR:
      return <PercentageCalculator />;
    case AppName.PNGTOJPEG:
      return <PngToJpeg />;
    case AppName.IMAGETOPDF:
      return <ImageToPdf />;
    case AppName.PHOTORESIZER:
      return <PhotoResizer />;
    case AppName.COMPOUND_INTEREST_CALCULATOR:
      return <CompoundInterestCalculator />;
    case AppName.KRUTIDEV_TO_UNICODE:
      return <KrutidevToUnicode />;
    case AppName.FINSHOTS:
      return <Finshots />;
    case AppName.SIP_CALCULATOR:
      return <SipCalculator />;
    case AppName.HOME_LOAN_CALCULATOR:
      return <HomeLoanCalculator />;
    case AppName.PHOTO_SIZE_REDUCER:
      return <PhotoSizeReducer />;
    case AppName.IMAGE_TO_TEXT:
      return <ImageToText />;
    case AppName.CGPA_TO_PERCENTAGE:
      return <CgpaToPercentage />;
    case AppName.AIR_POLLUTION:
      return <AirPollution />;
    case AppName.ANAND_BAZAAR_PATRIKA:
      return <AnandBazaarPatrika />;
    case AppName.GRAMMAR_CHECK:
      return <GrammarCheck />;
    case AppName.YOUTUBEDOWNLOAD:
      return <YoutubeDownload />;
    case AppName.WIFITRANSFER:
      return <WifiTransfer />;
    case AppName.COURIERTRACK:
      return <CourierTrack />;
    case AppName.TYPEMASTER:
      return <TypeMaster />;
    case AppName.DOC_TO_PDF:
      return <DocToPdf />;
    case AppName.PPT_TO_PDF:
      return <PptToPdf />;
    case AppName.EXCEL_TO_PDF:
      return <ExcelToPdf />;
    case AppName.AGECALCULATOREXCEL:
      return <AgeCalculatorExcel />;
    case AppName.AGEDIFF:
      return <AgeDiff />;
    case AppName.BIRTHYEARCALCULATOR:
      return <BirthyearCalculator />;
    case AppName.CHAT_GPT:
      return <ChatGpt />;
    case AppName.IMAGECREATION:
      return <ImageCreation />;
  }
};
