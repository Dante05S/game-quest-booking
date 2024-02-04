import Image from 'next/image';
import Card from '@/components/Surfaces/Card';
import Button from '@/components/Buttons/Button';
import { FaCalendar, FaUsers } from 'react-icons/fa';
import { type Event } from '@/models/Event';
import { getDate } from '@/utils/formatDate';

interface Props {
  event: Event;
}

export function EventComponent({ event }: Props): React.JSX.Element {
  console.log(event);
  return (
    <div
      className="w-full md:max-w-[50%] md:basis-1/2 lg:max-w-full lg:basis-full
        xl:max-w-[50%] xl:basis-1/2 2xl:max-w-[736px] 2xl:basis-[736px] grow-0 px-2.5 py-2.5"
    >
      <Card>
        <div className="w-full flex flex-col lg:flex-row gap-3 p-3">
          <div className="w-full relative block lg:max-w-[50%] h-60 lg:basis-1/2">
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
          <div className="flex flex-col lg:max-w-[50%] lg:basis-1/2">
            <div className="max-h-16">
              <h5 className="text-2xl font-medium text-primary line-clamp-2">
                {event.name}
              </h5>
            </div>
            <div className="h-full mt-1.5">
              <p className="font-extralight line-clamp-5">
                {event.description}
              </p>
            </div>
            <div className="flex gap-4 mt-2 font-semibold text-primary text-base">
              <div className="flex gap-1.5 items-center">
                <FaCalendar size={15} />
                <p>Fecha: {getDate(event.start_date)}</p>
              </div>
              <div className="flex gap-1.5 items-center">
                <FaUsers size={19} />
                <p>Cupos: {event.available_quotas}</p>
              </div>
            </div>
            <div className="flex mt-4 gap-4">
              <Button variant="rounded">Reservar</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
