import Image, { type StaticImageData } from 'next/image';
import React from 'react';

interface StaticRequire {
  default: StaticImageData;
}

type StaticImport = StaticRequire | StaticImageData;

interface Props {
  children?: string;
  size?: number;
  src?: string | StaticImport;
  alt?: string;
}

export default function Avatar({
  children,
  size = 50,
  src = '',
  alt = ''
}: Props): React.JSX.Element {
  return (
    <>
      {children === undefined ? (
        <div
          className="relative rounded-full overflow-hidden"
          style={{
            maxWidth: size,
            minWidth: size,
            width: size,
            maxHeight: size,
            minHeight: size,
            height: size
          }}
        >
          <Image fill className="object-cover" src={src} alt={alt} />
        </div>
      ) : (
        <div
          className="rounded-full bg-primary text-primary-font flex justify-center items-center"
          style={{
            maxWidth: size,
            minWidth: size,
            width: size,
            maxHeight: size,
            minHeight: size,
            height: size,
            fontSize: size / 2.3
          }}
        >
          {children.charAt(0).toUpperCase()}
        </div>
      )}
    </>
  );
}
