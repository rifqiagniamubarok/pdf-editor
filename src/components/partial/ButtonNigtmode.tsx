'use client';
import { Button } from '@nextui-org/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const ButtonNigtmode = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => {
        if (theme === 'light') setTheme('dark');
        else setTheme('light');
      }}
      isIconOnly
      variant="faded"
    >
      {theme === 'light' ? <Sun /> : <Moon />}
    </Button>
  );
};
export default ButtonNigtmode;
