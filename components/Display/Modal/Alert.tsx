import React from 'react';
import Modal from '.';
import SuccesCheck from '@/components/Animations/SuccesCheck';
import clsx from 'clsx';
import Error from '@/components/Animations/Error';
import { type Severity } from '@/types/severity.type';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  toggle: () => void;
  severity?: Severity;
}

export default function ModalAlert({
  children,
  isOpen,
  toggle,
  severity = 'success'
}: Props): React.JSX.Element {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <div className="py-2 px-3 flex flex-col items-center">
        <div className="py-0.5">
          {severity === 'success' && (
            <div className="flex justify-center items-center bg-primary rounded-full p-1 animate-scale-popup">
              <SuccesCheck />
            </div>
          )}
          {severity === 'error' && <Error />}
          <div className="mt-2">
            <span
              className={clsx('font-semibold text-lg', {
                'text-primary': severity === 'success',
                'text-error': severity === 'error'
              })}
            >
              {severity === 'success' ? 'Genial' : 'Que mal'}
            </span>
          </div>
        </div>

        {children}
      </div>
    </Modal>
  );
}
