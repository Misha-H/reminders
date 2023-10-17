import { createContext, useState } from 'react';

import { data } from '../data';

import type { FC, PropsWithChildren } from 'react';

const defaultContext = {
  data,
  filteredData: data,
  filter(search: string) {},
};

export const DataContext = createContext(defaultContext);

export const DataContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState(defaultContext.data);
  const [filteredData, setFilteredData] = useState(defaultContext.filteredData);

  const context = {
    data,
    filteredData: filteredData,
    filter(search: string) {
      const re = new RegExp(search, 'i');
      setFilteredData(
        this.data.filter((dataItem) => re.test(dataItem.description))
      );
    },
  };

  return (
    <DataContext.Provider value={context}>{children}</DataContext.Provider>
  );
};
