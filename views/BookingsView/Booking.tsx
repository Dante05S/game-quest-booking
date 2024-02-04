import Button from '@/components/Buttons/Button';
import ModalEvent from '@/components/ModalEvent';
import Card from '@/components/Surfaces/Card';
import useModal from '@/hooks/useModal';
import { type Booking } from '@/models/Booking';
import { getDate } from '@/utils/formatDate';
import Image from 'next/image';
import React from 'react';
import { FaCalendar } from 'react-icons/fa';
import Status from './Status';
import ButtonCancel from './ButtonCancel';
import { isFinishEvent } from '@/utils/isFinishEvent';

interface Props {
  booking: Booking;
}

export default function BookingComponent({
  booking
}: Props): React.JSX.Element {
  const [isOpen, toggle] = useModal();

  return (
    <>
      <div
        className="animate-scale-popup w-full md:max-w-[50%] md:basis-1/2 lg:max-w-full lg:basis-full
        xl:max-w-[50%] xl:basis-1/2 2xl:max-w-[736px] 2xl:basis-[736px] grow-0 px-2.5 py-2.5"
      >
        <Card>
          <div className="w-full flex flex-col lg:flex-row gap-3 p-3">
            <div className="w-full relative block lg:max-w-[50%] h-60 lg:basis-1/2">
              <Image
                alt="Imagen evento"
                src={booking.event.image}
                sizes="(min-width: 808px) 50vw, 100vw"
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>
            <div className="flex flex-col lg:max-w-[50%] lg:basis-1/2">
              <div className="max-h-16">
                <h5 className="text-2xl font-medium text-primary line-clamp-2">
                  {booking.event.name}
                </h5>
              </div>
              <div className="h-full mt-1.5">
                <p className="font-extralight line-clamp-5">
                  {booking.event.description}
                </p>
              </div>
              <div className="flex gap-4 mt-2 font-semibold text-primary text-base">
                <div className="flex gap-1.5 items-center">
                  <FaCalendar size={15} />
                  <p>Fecha: {getDate(booking.event.start_date)}</p>
                </div>
                <Status
                  status={booking.status}
                  startDate={booking.event.start_date}
                />
              </div>
              <div className="flex mt-4 gap-4">
                <Button
                  variant="rounded"
                  onClick={() => {
                    toggle();
                  }}
                >
                  Ver
                </Button>
                {!isFinishEvent(booking.event.start_date) &&
                  booking.status !== 'CANCEL' && (
                    <ButtonCancel bookingId={booking.id} />
                  )}
              </div>
            </div>
          </div>
        </Card>
      </div>
      <ModalEvent
        isOpen={isOpen}
        toggle={toggle}
        event={booking.event}
        isBooking
        status={booking.status}
        bookingId={booking.id}
      />
    </>
  );
}
