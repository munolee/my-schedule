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
    let theme = window.localStorage.getItem('app_theme') as Theme;
    if (!theme) {
      const { matches } = window.matchMedia('(prefers-color-scheme: dark)');
      theme = matches ? Theme.Dark : Theme.Light;
    }
    setTheme(theme);
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = theme === Theme.Light ? Colors.bgLight : Colors.bgDark;

    setTimeout(() => {
      window.localStorage.setItem('app_theme', theme);
    }, 100);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === Theme.Dark ? Theme.Light : Theme.Dark));
  }, []);

  return { theme, toggleTheme };
};

export default useTheme;
