import Button from '@/components/Buttons/Button';
import AlertYesNo from '@/components/Display/Modal/AlertYesNo';
import { responseIsOk } from '@/helpers/request';
import useModal from '@/hooks/useModal';
import useAlertControl from '@/hooks/userAlertControl';
import { selectToken } from '@/redux/slices/userSlice';
import BookingService from '@/services/BookingService';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

interface Props {
  bookingId: string;
}

export default function ButtonCancel({ bookingId }: Props): React.JSX.Element {
  const token = useSelector(selectToken);
  const { openAlert } = useAlertControl();
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, toggle] = useModal();

  const cancel = async (): Promise<void> => {
    toggle();
    setLoading(true);
    const bookingService = new BookingService();
    const response = await bookingService.cancel(bookingId, token ?? '');

    if (!responseIsOk(response.success, response.data)) {
      openAlert('error', response.errors);
      setLoading(false);
      return;
    }
    openAlert('success', ['La reserva se cancelo existosamente']);
    setLoading(false);
  };

  return (
    <>
      <Button
        variant="rounded"
        color="error"
        loading={loading}
        onClick={() => {
          toggle();
        }}
      >
        Cancelar
      </Button>
      <AlertYesNo
        isOpen={isOpen}
        toggle={toggle}
        accept={() => {
          void cancel();
        }}
        text="¿Estas seguro de que quieres cancelarla?"
      />
    </>
  );
}
