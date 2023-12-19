export interface Storage {
  [key: string]: any;
  theme: {
    'theme-background': '#e9e9e9' | string;
    'theme-foreground': '#1e1e1e' | string;
  };
  typography: {
    font:
      | 'font-nunito'
      | 'font-system'
      | 'font-monospace'
      | 'font-arial'
      | 'font-times-new-roman';
    size:
      | 'size-12'
      | 'size-13'
      | 'size-14'
      | 'size-15'
      | 'size-16'
      | 'size-17'
      | 'size-18';
  };
}

export class LocalStorage {
  static name = '__storage';
  static store = window.localStorage;
  static defaults: Storage = {
    typography: {
      font: 'font-nunito',
      size: 'size-16',
    },
    theme: {
      'theme-background': '#e9e9e9',
      'theme-foreground': '#1e1e1e',
    },
  };

  public static save(value: Storage) {
    this.store.setItem(this.name, JSON.stringify(value));
    return value;
  }

  public static reset() {
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
