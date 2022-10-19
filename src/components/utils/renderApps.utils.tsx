import React from "react";
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
  Unsplash,
  BarcodeGenerator,
  QrcodeGenerator,
  UrlShortner,
  PercentageCalculator,
  PngToJpeg,
  ImageToPdf,
  PhotoResizer,
} from "../../usecases";
import { Apps } from "../../utils/api.utils";
import { AppName } from "../../utils/appName.utils";

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
  }
};
