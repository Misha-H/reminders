import { useContext } from 'react';

import { SettingsContext } from '~/context/settings';

export const useSettings = () => {
  const settings = useContext(SettingsContext);

  if (settings === undefined) {
    throw new Error('Cannot use useSettings outside of SettingsContext.Provider');
  }

  return settings;
};