// React
import React from 'react';

// Components
import IconButton from './Buttons/IconButton';

// Icons
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

interface Props {
  show: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ShowPassword({ show, onClick }: Props): JSX.Element {
  return (
    <IconButton onClick={onClick} variant="plain">
      {!show ? (
        <AiFillEye className="text-xl" />
      ) : (
        <AiFillEyeInvisible className="text-xl" />
      )}
    </IconButton>
  );
}
