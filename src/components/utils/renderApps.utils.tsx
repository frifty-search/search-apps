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
  }
};
