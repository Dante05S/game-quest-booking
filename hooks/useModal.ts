import { useState } from 'react';

const useModal = (): [boolean, () => void] => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = (): void => {
    setIsOpen(!isOpen);
  };

  return [isOpen, toggle];
};

export default useModal;
