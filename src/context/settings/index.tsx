import { createContext, useState } from 'react';

import type { FC, PropsWithChildren } from 'react';

// TODO: update defaults, find structure that works best for linking UI to context.
const defaultContext = {
  defaults: {
    theme: {
      background: '#000',
      foreground: '#000',
    },
    typography: {
      font: 'font-family-monospace',
      size: 'size-10',
    },
  },
  currentSettings: null,
};

export const DataContext = createContext(defaultContext);

export const DataContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const context = { ...defaultContext };

  return (
    <DataContext.Provider value={context}>{children}</DataContext.Provider>
  );
};
