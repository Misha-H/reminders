import { createContext, useState } from 'react';

import { LocalStorage } from '~/utils';

import type { FC, PropsWithChildren } from 'react';

import type { FormFieldType } from '~/components';
import type { Group } from '~/pages/Settings';
import type { Storage } from '~/utils';

type SettingsContextUpdateFn = (
  group: Group['id'],
  field: FormFieldType['id'],
  fieldVar: Group['fields'][number]['var'],
  newValue: string
) => void;

interface SettingsContextType {
  settings: Storage;
  getSettings: () => void;
  resetSettings: () => void;
  updateSettings: SettingsContextUpdateFn;
}

// TODO: defaultContext is running, not the context in context provider
const defaultContext: SettingsContextType = {
  settings: LocalStorage.get(),
  getSettings: () => {},
  resetSettings: () => {},
  updateSettings: () => {},
};

export const SettingsContext = createContext(defaultContext);

// TODO: Fix broken
// Settings are not updating in storage or state
export const SettingsContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [settings, setSettings] = useState<Storage>(LocalStorage.get());
  let lastTimeoutId: number | null = null;

  const getSettings = () => {
    // TODO: Remove log
    console.log('getSettings');
  };

  const resetSettings = () => {
    // TODO: Remove log
    console.log('resetSettings');
  };

  const updateSettings: SettingsContextUpdateFn = (
    group,
    field,
    fieldVar,
    newValue
  ) => {
    // TODO: Remove log
    console.log('updateSettings');

    if (lastTimeoutId) {
      // cancel any existing timeouts
      window.clearTimeout(lastTimeoutId);
    }

    // TODO: Remove log
    console.log(newValue);

    lastTimeoutId = window.setTimeout(
      () => {
        // Update settings
        setSettings((prevSettings) => {
          // Make a shallow copy of the settings
          const settings = { ...prevSettings };
          // Update the changed value
          settings[group][field] = newValue;
          // Save updated settings to local storage
          LocalStorage.save(settings);
          // Update the css variables to use new settings globally
          document.documentElement.style.setProperty(fieldVar, newValue);
          // Update the settings state to reflect saved settings
          return settings;
        });

        lastTimeoutId = null; // tells timeout when completed
      },
      1000 // one second time out between changing settings to avoid overload/lag
    );
  };

  const context: SettingsContextType = {
    settings,
    getSettings,
    resetSettings,
    updateSettings,
  };

  return (
    <SettingsContext.Provider value={context}>
      {children}
    </SettingsContext.Provider>
  );
};
