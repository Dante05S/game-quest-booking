import React from 'react';
import Modal from '../Display/Modal';
import ListComments from './ListComments';
import InputComment from './InputComment';

interface Props {
  isOpen: boolean;
  toggle: () => void;
  eventName: string;
}

export default function ModalComment({
  isOpen,
  toggle,
  eventName
}: Props): React.JSX.Element {
  return (
    <Modal isOpen={isOpen} toggle={toggle} breakPointWidth="sm:w-[500px]">
      <div className="relative px-6 w-screen sm:w-[500px]">
        <h4 className="text-primary font-semibold text-2xl mb-1">
          {eventName}
        </h4>
        <ListComments />
        <InputComment />
      </div>
    </Modal>
  );
}
