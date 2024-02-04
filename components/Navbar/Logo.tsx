// Next
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo.png';

// React
import React from 'react';

interface Props {
  size?: number;
}

export default function Logo({ size = 120 }: Props): React.JSX.Element {
  return (
    <div className="font-logo text-2xl">
      <Link href="/">
        <Image src={logo} alt="logo" width={size} height={size} />
      </Link>
    </div>
  );
}
