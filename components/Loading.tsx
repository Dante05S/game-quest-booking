import React from 'react';
import CircularProgress from './Animations/CircularProgress';

interface Props {
  children?: React.ReactNode;
  loading: boolean;
  title?: JSX.Element;
}

export default function Loading({
  children,
  loading,
  title
}: Props): JSX.Element {
  return (
    <>
      {loading ? (
        <div className="w-full h-[calc(100vh_-_var(--height-nav))] flex justify-center items-center flex-col">
          <CircularProgress color="primary" size={70} />
          {title}
        </div>
      ) : (
        children
      )}
    </>
  );
}
