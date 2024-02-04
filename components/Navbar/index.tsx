// React
import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import User from './User';
import clsx from 'clsx';

export default function NavBar(): React.JSX.Element {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  }, []);

  return (
    <header className="z-10 sticky top-0">
      <nav
        className={clsx(
          'px-6 transition-all duration-300 flex justify-between items-center',
          {
            'h-[var(--height-nav)]': !scrolled,
            'h-[var(--height-scrolled-nav)] bg-black/70': scrolled
          }
        )}
      >
        <Logo size={scrolled ? 70 : 120} />
        <User />
      </nav>
    </header>
  );
}
