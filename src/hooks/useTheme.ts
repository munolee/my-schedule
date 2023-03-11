import { useState, useEffect, useCallback } from 'react';

type ThemeType = 'light' | 'dark';

interface UseThemeType {
  theme: ThemeType;
  toggleTheme: () => void;
}

const useTheme = (): UseThemeType => {
  const getInitialTheme = useCallback(() => {
    let theme;
    if (typeof window !== 'undefined') {
      theme = window.localStorage.getItem('app_theme');

      const { matches } = window.matchMedia('(prefers-color-scheme: dark)');
      theme = matches ? 'dark' : 'light';
    }
    return theme as ThemeType;
  }, []);

  const [theme, setTheme] = useState<ThemeType>(getInitialTheme);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('app_theme', theme);
  }, [theme]);

  return { theme, toggleTheme };
};

export default useTheme;
