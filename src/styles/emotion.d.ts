import '@emotion/react';

type themeId = 'light' | 'dark';

declare module '@emotion/react' {
  export interface Theme {
    [key in themeId]: {
      background: string;
      color: string;
      hoverBackground: string;
    };
  }
}
