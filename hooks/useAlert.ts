import { useState } from 'react';
import { type Severity } from '@/types/severity.type';

interface AlertState {
  messages: string[];
  severity: Severity;
  alert: (
    severety: Severity,
    messages: string[],
    toggleModal: () => void
  ) => void;
}

const useAlert = (): AlertState => {
  const [messages, setMessages] = useState<string[]>([]);
  const [severity, setSeverity] = useState<Severity>('success');

  const alert = (
    severity: Severity,
    messages: string[],
    toggleModal: () => void
  ): void => {
    setSeverity(severity);
    setMessages(messages);
    toggleModal();
  };

  return {
    messages,
    severity,
    alert
  };
};

export default useAlert;
