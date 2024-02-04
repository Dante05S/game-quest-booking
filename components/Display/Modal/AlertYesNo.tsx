import React from 'react';
import Modal from '.';
import { IoIosWarning } from 'react-icons/io';
import Button from '@/components/Buttons/Button';

interface Props {
  isOpen: boolean;
  toggle: () => void;
  accept: () => void;
  text: string;
}

export default function AlertYesNo({
  isOpen,
  toggle,
  accept,
  text
}: Props): React.JSX.Element {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <div className="flex items-center gap-2">
        <IoIosWarning size={25} className="text-primary" />
        <p>{text}</p>
      </div>
      <div className="flex gap-4 mt-6">
        <Button
          variant="rounded"
          color="primary"
          onClick={() => {
            accept();
          }}
        >
          Si
        </Button>
        <Button
          variant="rounded"
          color="error"
          onClick={() => {
            toggle();
          }}
        >
          No
        </Button>
      </div>
    </Modal>
  );
}
