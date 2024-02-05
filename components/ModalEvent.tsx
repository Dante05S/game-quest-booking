import React, { useState } from 'react';
import Modal from './Display/Modal';
import Image from 'next/image';
import { type Event } from '@/models/Event';
import { getDate } from '@/utils/formatDate';
import { FaCalendar, FaUsers } from 'react-icons/fa';
import Button from './Buttons/Button';
import BookingService from '@/services/BookingService';
import { useSelector } from 'react-redux';
import { selectToken, selectUser } from '@/redux/slices/userSlice';
import { responseIsOk } from '@/helpers/request';
import useAlertControl from '@/hooks/userAlertControl';
import { useRouter } from 'next/router';
import { type BookingStatus } from '@/models/Booking';
import Status from '@/views/BookingsView/Status';
import { isFinishEvent } from '@/utils/isFinishEvent';
import ButtonCancel from '@/views/BookingsView/ButtonCancel';

interface Props {
  isOpen: boolean;
  toggle: () => void;
  event: Event;
  isBooking?: boolean;
  status?: BookingStatus;
  bookingId?: string;
}

interface ButtonReservationProps {
  eventId: string;
  startDate: Date;
  availableQuotas: number;
}

function ButtonReservation({
  eventId,
  startDate,
  availableQuotas
}: ButtonReservationProps): React.JSX.Element {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const router = useRouter();
  const { openAlert } = useAlertControl();
  const [loading, setLoading] = useState<boolean>(false);

  const redirectTo = async (): Promise<void> => {
    await router.push('/bookings');
    setLoading(false);
  };

  const makeReservation = async (): Promise<void> => {
    if (token === null) {
      void router.push('/register');
      return;
    }
    setLoading(true);
    const bookingService = new BookingService();
    const response = await bookingService.create(
      {
        user_id: user?.id ?? '',
        event_id: eventId
      },
      false,
      token
    );
    if (!responseIsOk(response.success, response.data)) {
      openAlert('error', response.errors);
      setLoading(false);
      return;
    }
    openAlert('success', ['Reserva realizada exitosamente']);
    setTimeout(() => {
      void redirectTo();
    }, 800);
  };

  return (
    <Button
      variant="rounded"
      loading={loading}
      disabled={isFinishEvent(startDate) || availableQuotas <= 0}
      onClick={() => {
        void makeReservation();
      }}
    >
      {availableQuotas <= 0 ? (
        'Sin cupos'
      ) : (
        <>
          {isFinishEvent(startDate) ? (
            'Finalizado'
          ) : (
            <>{token !== null ? <>{'Reservar'}</> : <>{'Registrate'}</>}</>
          )}
        </>
      )}
    </Button>
  );
}

export default function ModalEvent({
  isOpen,
  toggle,
  event,
  isBooking = false,
  status = 'ACTIVE',
  bookingId
}: Props): React.JSX.Element {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <div className="w-full flex flex-col gap-3 p-3">
        <div className="w-full relative block h-60">
          <Image
            alt="Imagen evento"
            src={event.image}
            sizes="(min-width: 808px) 50vw, 100vw"
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </div>
        <div className="flex flex-col">
          <div className="max-h-16">
            <h5 className="text-2xl font-medium text-primary">{event.name}</h5>
          </div>
          <div className="mt-1.5">
            <p className="font-extralight">{event.description}</p>
          </div>
          <div className="flex justify-center gap-4 mt-2 font-semibold text-primary text-base">
            <div className="flex gap-1.5 items-center">
              <FaCalendar size={15} />
              <p>Fecha: {getDate(event.start_date)}</p>
            </div>
            {!isBooking ? (
              <div className="flex gap-1.5 items-center">
                <FaUsers size={19} />
                <p>Cupos: {event.available_quotas}</p>
              </div>
            ) : (
              <Status status={status} startDate={event.start_date} />
            )}
          </div>
          <div className="flex mt-4 gap-4">
            {!isBooking ? (
              <ButtonReservation
                eventId={event.id}
                startDate={event.start_date}
                availableQuotas={event.available_quotas}
              />
            ) : (
              <>
                {!isFinishEvent(event.start_date) && status !== 'CANCEL' && (
                  <ButtonCancel bookingId={bookingId ?? ''} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
