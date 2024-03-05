import { useState } from 'react';

import { LocalStorage } from '~/utils';

import type { FormFieldType } from '~/components';
import type { Group } from '~/pages/Settings';
import type { Storage } from '~/utils';

export const groups: Array<Group> = [
  {
    id: 'theme',
    label: 'Theme',
    fields: [
      {
        id: 'theme-background',
        label: 'Background Colour',
        type: 'color',
        var: '--primary-background-color',
      },
      {
        id: 'theme-foreground',
        label: 'Foreground Colour',
        type: 'color',
        var: '--primary-text-color',
      },
    ],
  },
  {
    id: 'typography',
    label: 'Typography',
    fields: [
      {
        id: 'font',
        label: 'Font',
        type: 'dropdown',
        var: '--font-family',
        enum: [
          {
            id: 'font-nunito',
            label: 'Nunito',
            value: "'Nunito', Arial, sans-serif",
          },
          {
            id: 'font-system',
            label: 'System',
            value:
              "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Ubuntu, 'Open Sans', sans-serif",
          },
          {
            id: 'font-monospace',
            label: 'Monospace',
            value: "'Courier New', Courier, monospace",
          },
          {
            id: 'font-arial',
            label: 'Arial',
            value: 'Arial, Helvetica, sans-serif',
          },
          {
            id: 'font-times-new-roman',
            label: 'Times New Roman',
            value: "'Times New Roman', Times, serif",
          },
        ],
      },
      {
        id: 'size',
        label: 'Text Size',
        type: 'dropdown',
        var: '--font-size',
        enum: [
          { id: 'size-12', label: '12', value: '12px' },
          { id: 'size-13', label: '13', value: '13px' },
          { id: 'size-14', label: '14', value: '14px' },
          { id: 'size-15', label: '15', value: '15px' },
          { id: 'size-16', label: '16', value: '16px' },
          { id: 'size-17', label: '17', value: '17px' },
          { id: 'size-18', label: '18', value: '18px' },
        ],
      },
    ],
  },
];

export const useSettings = () => {
  const [settings, setSettings] = useState<Storage>(LocalStorage.get());
  let lastTimeoutId: number | null = null;

  const updateCssVars = (updates: Storage) => {
    // This is what default settings looks like
    // {
    //   "typography": {
    //     "font": { value: "font-nunito", var: '--my-css-var }, // maybe how should be saving objects
    //     "size": "size-16"
    //   },
    //   "theme": {
    //     "theme-background": "#e9e9e9",
    //     "theme-foreground": "#1e1e1e"
    //   }
    // }

    for (const groupKey in updates) {
      const group = updates[groupKey];

      for (const fieldKey in group) {
        const { value, var: cssVar } = group[fieldKey];

        // TODO: This is all to get the variable, which is already known in `updateSettings`
        // Potentially just save `var` in local storage // Done but double check
        // May not need to check against a map at all - which is ideal
        document.documentElement.style.setProperty(cssVar, value);
      }
    }
  };

  const resetSettings = (): void => {
    // Save default settings to local storage
    const defaultSettings = LocalStorage.reset();
    setSettings(defaultSettings);
    updateCssVars(defaultSettings);
  };

  const updateSettings = (
    group: Group['id'],
    field: FormFieldType['id'],
    fieldVar: Group['fields'][number]['var'],
    newValue: string
  ): void => {
    // Cancel any existing timeouts
    if (lastTimeoutId) {
      window.clearTimeout(lastTimeoutId);
    }

    lastTimeoutId = window.setTimeout(
      () => {
        // Update settings
        setSettings((prevSettings) => {
          // Make a shallow copy of the settings
          const newSettings = {
            [group]: {
              [field]: { value: newValue, var: fieldVar },
            },
          };
          // Update the changed value
          const tempSettings = { ...prevSettings, ...newSettings };
          // Save updated settings to local storage
          LocalStorage.save(tempSettings);
          // TODO: Changing value is causing error.
          // Update the css variables to use new settings globally
          updateCssVars(newSettings);
          // Update the settings state to reflect saved settings
          return tempSettings;
        });

        lastTimeoutId = null; // Tells timeout when completed
      },
      1000 // One second time out between changing settings to avoid overload/lag
    );
  };

  return {
    settings,
    resetSettings,
    updateSettings,
  };
};
