import { useState, useEffect, useCallback } from 'react';
import { Colors } from '@styles/theme';

const enum Theme {
  Light = 'light',
  Dark = 'dark',
}

interface UseThemeType {
  theme: Theme;
  toggleTheme: () => void;
}

const useTheme = (): UseThemeType => {
  const [theme, setTheme] = useState<Theme>(Theme.Light);

  useEffect(() => {
    if (
      window.localStorage.getItem('app_theme') === Theme.Dark ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setTheme(Theme.Dark);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('app_theme', theme);
    document.body.style.backgroundColor = theme === Theme.Light ? Colors.bgLight : Colors.bgDark;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === Theme.Dark ? Theme.Light : Theme.Dark));
  }, []);

  return { theme, toggleTheme };
};

export default useTheme;
