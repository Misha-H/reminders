export interface Storage {
  [groupKey: string]: {
    [fieldKey: string]: {
      value: string;
      /** CSS variable name. */
      var: string;
    }
  };
}

export class LocalStorage {
  private static name = '__storage';
  private static store = window.localStorage;
  public static defaults: Storage = {
    typography: {
      font: { value: 'font-nunito', var: '--font-family' },
      size: { value: 'size-16', var: '--font-size' },
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
