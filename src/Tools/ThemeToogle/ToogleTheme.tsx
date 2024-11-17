import { useEffect, useState } from 'react';

import { localStorageSelectors } from '../';

import { Button } from '@/Ui';
import { MoonIcon, SunIcon } from '/public';

type ThemeModes = 'whiteMode' | 'darkMode';

const ToggleTheme = () => {
  const [themeMode, setThemeMode] = useState<ThemeModes>(() => {
    const savedTheme = localStorage.getItem(localStorageSelectors.theme);
    const savedThemeAsMode = savedTheme as ThemeModes;

    const baseTheme = 'whiteMode';

    return savedThemeAsMode || baseTheme;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
    localStorage.setItem(localStorageSelectors.theme, themeMode);

    return () => {
      document.documentElement.removeAttribute('data-theme');
    };
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode(themeMode === 'whiteMode' ? 'darkMode' : 'whiteMode');
  };

  return (
    <Button
      text={themeMode === 'whiteMode' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleTheme}
    />
  );
};

export { ToggleTheme };
