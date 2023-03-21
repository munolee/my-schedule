export const Colors = {
  gray010: '#f2f0f4',
  gray020: '#e9e9e9',
  gray030: '#dddddd',
  gray040: '#999999',
  gray050: '#666666',
  gray060: '#4c4c4c',
  gray070: '#333333',
  gray080: '#232323',
  gray090: '#201f21',

  red010: '#ff7272', // 일정 생성 버튼
  red020: '#ff0d37', // 모달 에러 메시지, 일요일 폰트 색상
  red030: '#673e3e',

  blue010: '#4b81AF',
  blue020: '#0067A3', // 토요일 폰트 색상
  blue030: '#56689a',

  green010: '#cfe8e8', // 달력 오늘 색상
  green020: '#cfe8df', // 달력 오늘 색상 Hover

  orange010: '#edaa7d', // 로딩 스피너

  // 일정 배경 색상
  event1: '#cfdd8e',
  event2: '#eeb8b8',
  event3: '#6eceda',
  event4: '#b57fb3',
  event5: '#f5ddad',

  // 폰트 테마 색상
  white: '#ffffff',
  black: '#111111',

  // 토스트 메시지 색상
  toast: '#5a5b5c',
  success: '#f1f9eC',
  info: '#f5f4f5',
  error: '#fDf7fD',

  // 캘린더 테마 색상
  CalendarLight: '#ffffff',
  CalendarDark: '#1d1c1c',

  // 백그라운드 테마 색상
  bgLight: '#f9f8f7',
  bgDark: '#111111',
  // bgDark: '#2b2b2b',
};

export const FontSize = {
  s10: '1rem',
  s12: '1.2rem',
  s14: '1.4rem',
  s16: '1.6rem',
  s18: '1.8rem',
  s20: '2rem',
  s22: '2.2rem',
  s24: '2.4rem',
  s26: '2.6rem',
  s28: '2.8rem',
  s30: '3rem',
};

const palette = { colors: Colors, fontSize: FontSize };

type PaletteType = {
  colors: typeof Colors;
  fontSize: typeof FontSize;
};

export type ThemeType = {
  background: string;
  fontColor: string;
  hoverBackground: string;
  calendarBackground: string;
  calendarBorder: string;
  modalButton: string;
  sideBar: string;
} & PaletteType;

interface ThemeGroup {
  light: ThemeType;
  dark: ThemeType;
}

const Theme: ThemeGroup = {
  light: {
    background: Colors.bgLight,
    fontColor: Colors.black,
    hoverBackground: Colors.bgLight,
    calendarBackground: Colors.white,
    calendarBorder: Colors.gray020,
    modalButton: Colors.gray070,
    sideBar: Colors.white,
    ...palette,
  },
  dark: {
    background: Colors.bgDark,
    fontColor: Colors.white,
    hoverBackground: Colors.bgDark,
    calendarBackground: Colors.CalendarDark,
    calendarBorder: Colors.gray080,
    modalButton: Colors.blue010,
    sideBar: Colors.gray090,
    ...palette,
  },
};

export default Theme;
