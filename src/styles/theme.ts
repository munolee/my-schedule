interface ThemeType {
  background: string;
  color: string;
  hoverBackground: string;
}

interface ThemeGroup {
  light: ThemeType;
  dark: ThemeType;
}

export const Colors = {
  red1: '',

  white: '#ffffff',
  black: '#111111',

  bgLight: '#f9f8f7',
  bgDark: '#f9f8f7',
};

export const FontSize = {
  s1: '1rem',
  s12: '1.2rem',
  s14: '1.4rem',
  s16: '1.6rem',
  s18: '1.8r1em',
  s2: '2rem',
};

const Theme: ThemeGroup = {
  light: {
    background: Colors.bgLight,
    color: Colors.white,
    hoverBackground: Colors.bgLight,
  },
  dark: {
    background: Colors.bgDark,
    color: Colors.black,
    hoverBackground: Colors.bgDark,
  },
};

export default Theme;
