import type { HTMLAttributes } from 'react';

export interface Storage {
  [groupKey: string]: {
    [fieldKey: string]: {
      value: string;
      /** CSS variable name. */
      var: string;
    };
  };
}

export class LocalStorage {
  private static name = '__storage';
  private static store = window.localStorage;
  public static defaults: Storage = {
    typography: {
      font: { value: "'Nunito', Arial, sans-serif", var: '--font-family' },
      size: { value: '16px', var: '--font-size' },
    },
    theme: {
      'theme-background': { value: '#e9e9e9', var: '--primary-background-color' },
      'theme-foreground': { value: '#1e1e1e', var: '--primary-text-color' },
    },
  };

  public static save(value: Storage): Storage {
    this.store.setItem(this.name, JSON.stringify(value));
    return value;
  }

  public static reset(): Storage {
    return this.save(this.defaults);
  }

  public static get(): Storage {
    const store = this.store.getItem(this.name);

    if (!store) {
      return this.reset();
    }

    return JSON.parse(store);
  }
}

export function cls(...list: (boolean | string | undefined)[]): HTMLAttributes<HTMLElement>['className'] {
  const className: string[] = [];

  for (let i = 0; i < list.length; i++) {
    const value = list[i];
    if (typeof value === 'string' && value.length > 0) {
      className.push(value);
    }
  }

  return className.join(' ');
}
