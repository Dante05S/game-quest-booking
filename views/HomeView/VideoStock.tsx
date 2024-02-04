import Button from '@/components/Buttons/Button';
import Link from 'next/link';
import React from 'react';
import Typewriter from 'typewriter-effect';

function ButtonActions(): React.JSX.Element {
  return (
    <div className="flex gap-6 mt-7">
      <Link href="/register">
        <div className="w-40">
          <Button variant="rounded" padding="py-2">
            Registrate
          </Button>
        </div>
      </Link>
      <Link href="#events">
        <div className="w-40">
          <Button variant="outlined" padding="py-2">
            Eventos
          </Button>
        </div>
      </Link>
    </div>
  );
}

function Title(): React.JSX.Element {
  return (
    <h1 className="text-center">
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString('Juegos, risas, ¡acción! Eventos inolvidables para ti')
            .start();
        }}
        options={{
          delay: 60,
          wrapperClassName:
            'text-2xl text-center uppercase font-semibold 2md:text-3xl lg:text-[40px]',
          cursorClassName: 'text-2xl 2md:text-3xl lg:text-[40px] animate-blink'
        }}
      />
    </h1>
  );
}

export default function VideoStock(): React.JSX.Element {
  return (
    <div className="flex h-[calc(100vh_-_var(--height-scrolled-nav))]">
      <div className="absolute w-full h-[100vh] top-0 flex justify-center items-center z-[1]">
        <div className="flex flex-col p-3 items-center">
          <div className="flex flex-col items-center">
            <Title />
            <span className="text-primary mt-2 text-center text-base 2md:text-lg lg:text-xl">
              ¡Regístrate y comienza a asegurar tus reservas ahora mismo!
            </span>
          </div>
          <ButtonActions />
        </div>
      </div>
      <video
        className="w-full h-[100vh] object-cover absolute z-0 top-0 left-0 opacity-35"
        src="https://res.cloudinary.com/dxkm4eg87/video/upload/v1706979113/video-stock.mp4"
        muted
        autoPlay
        loop
        playsInline
      />
    </div>
  );
}
