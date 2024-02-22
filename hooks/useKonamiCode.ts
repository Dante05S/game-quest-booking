import { useEffect, useRef, useState } from 'react';

interface UseKonamiCode {
  success: boolean;
  reset: () => void;
}

const useKonamiCode = (): UseKonamiCode => {
  const [success, setSuccess] = useState<boolean>(false);
  const refInterval = useRef<NodeJS.Timer | null>(null);

  const resetListener = (): void => {
    setSuccess(false);
  };

  useEffect(() => {
    let keys: string[] = [];
    const konami =
      'ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,KeyB,KeyA';
    window.addEventListener(
      'keydown',
      function (e) {
        if (konami.includes(e.code)) {
          keys.push(e.code);
          console.log(keys.toString());
          if (keys.length > 10) {
            keys = [];
          } else if (keys.toString().includes(konami)) {
            setSuccess(true);
            keys = [];
          }
          clearTimeout(Number(refInterval.current));
          refInterval.current = setTimeout(() => {
            keys = [];
          }, 8000);
        } else {
          resetListener();
          keys = [];
        }
      },
      true
    );
  }, []);

  return {
    success,
    reset: resetListener
  };
};

export default useKonamiCode;
