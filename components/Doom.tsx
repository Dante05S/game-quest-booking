import useKonamiCode from '@/hooks/useKonamiCode';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Modal from './Display/Modal';
import doomguy from '../public/doomguy.gif';
import Image from 'next/image';

export default function Doom(): React.JSX.Element {
  const { success, reset } = useKonamiCode();
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = (): void => {
    if (isOpen) {
      reset();
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (success) {
      setIsOpen(true);
    }
  }, [success]);

  return (
    <Modal breakPointWidth="sm:w-[710px]" isOpen={isOpen} toggle={toggle}>
      {loading && (
        <div className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2">
          <div className="flex flex-col items-center justify-center">
            <Image width={60} height={60} src={doomguy} alt="doomguy" />
            <p className="font-semibold">Cargando...</p>
          </div>
        </div>
      )}
      <div
        className={clsx({
          'hidden': !isOpen,
          'block': isOpen
        })}
      >
        <iframe
          width="680"
          height="400"
          src="https://dos.zone/player/?bundleUrl=https%3A%2F%2Fcdn.dos.zone%2Fcustom%2Fdos%2Fdoom.jsdos?anonymous=1"
          allowFullScreen
          loading="lazy"
          onLoad={() => {
            setLoading(false);
          }}
          onLoadStart={() => {
            setLoading(true);
          }}
        />
      </div>
    </Modal>
  );
}
