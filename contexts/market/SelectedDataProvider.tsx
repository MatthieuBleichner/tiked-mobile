import React, { useState, PropsWithChildren } from 'react';
import SelectedDataContext from './SelectedDataContext';
import { IMarket, ICity } from '@/types/types';

const MarketProvider = ({ children }: PropsWithChildren) => {
  const [currentMarket, setCurrentMarket] = useState<IMarket>();
  const [currentCity, setCurrentCity] = useState<ICity>();

  return (
    <SelectedDataContext.Provider
      value={{ setCurrentMarket, currentMarket, currentCity, setCurrentCity }}
    >
      {children}
    </SelectedDataContext.Provider>
  );
};

export default MarketProvider;
