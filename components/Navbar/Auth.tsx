import React from 'react';
import Link from 'next/link';
import Button from '../Buttons/Button';

export default function Auth(): React.JSX.Element {
  return (
    <div className="flex gap-6">
      <Link href="/login">
        <div className="w-32 sm:w-40">
          <Button variant="outlined">Iniciar sesión</Button>
        </div>
      </Link>
      <Link href="/register">
        <div className="w-32 sm:w-40">
          <Button variant="rounded">Registrate</Button>
        </div>
      </Link>
    </div>
  );
}
