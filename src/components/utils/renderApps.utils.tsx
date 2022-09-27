import React from "react";
import { DumbCharades, AgeCalculator } from "../../usecases";
import { Apps } from "../../utils/api.utils";
import { AppName } from "../../utils/appName.utils";

export const renderApps = ({ appId, data }: Apps): React.ReactNode => {
  switch (appId) {
    case AppName.DUMBCHARADES:
      return <DumbCharades data={data} />;
    case AppName.AGECALCULATOR:
      return <AgeCalculator />;
  }
};
