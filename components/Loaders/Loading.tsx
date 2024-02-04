import React from 'react';
import SpinnerPong from '../Animations/SpinnerPong';

export default function Loading(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-3 items-center">
      <SpinnerPong />
      <p className="text-lg">Cargando...</p>
    </div>
  );
}
