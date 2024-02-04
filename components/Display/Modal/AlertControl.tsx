import React from 'react';
import ModalAlert from './Alert';

import { AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import AlertControlContext from '@/context/AlertControlContext';
import useModal from '@/hooks/useModal';
import useAlert from '@/hooks/useAlert';
import { type Severity } from '@/types/severity.type';

interface Props {
  children: React.ReactNode;
}

export default function AlertControl({ children }: Props): React.JSX.Element {
  const [isOpen, toggle] = useModal();
  const { messages, severity, alert } = useAlert();

  const openAlert = (severity: Severity, messages: string[]): void => {
    alert(severity, messages, toggle);
  };

  return (
    <AlertControlContext.Provider
      value={{
        messages,
        severity,
        openAlert
      }}
    >
      {children}
      <ModalAlert severity={severity} isOpen={isOpen} toggle={toggle}>
        <div className="flex flex-col gap-1.5 justify-center mt-1.5">
          {messages.map((msg, index) => (
            <div className="flex" key={index}>
              <div>
                {severity === 'error' && (
                  <AiOutlineCloseCircle className="text-xl text-error" />
                )}
                {severity === 'success' && (
                  <AiOutlineCheckCircle className="text-xl text-primary" />
                )}
              </div>
              <div className="ml-1.5">
                <p className="text-[0.9rem] break-all">{msg}</p>
              </div>
            </div>
          ))}
        </div>
      </ModalAlert>
    </AlertControlContext.Provider>
  );
}
