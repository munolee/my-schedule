import { useState, useEffect, useCallback } from 'react';
import { Colors } from '@styles/theme';

type ThemeType = 'light' | 'dark';

interface UseThemeType {
  theme: ThemeType;
  toggleTheme: () => void;
}

const useTheme = (): UseThemeType => {
  const getInitialTheme = useCallback(() => {
    // TODO window 객체 생성 전 기본값 못 찾는 이슈
    let theme: ThemeType = 'light';
    if (typeof window !== 'undefined') {
      theme = window.localStorage.getItem('app_theme') as ThemeType;

      const { matches } = window.matchMedia('(prefers-color-scheme: dark)');
      theme = matches ? 'dark' : 'light';
    }
    return theme;
  }, []);

  const [theme, setTheme] = useState<ThemeType>(getInitialTheme);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('app_theme', theme);
    document.body.style.backgroundColor = theme === 'light' ? Colors.bgLight : Colors.bgDark;
  }, [theme]);

  return { theme, toggleTheme };
};

export default useTheme;
