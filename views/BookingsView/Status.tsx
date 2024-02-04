import { type BookingStatus } from '@/models/Booking';
import { isFinishEvent } from '@/utils/isFinishEvent';
import clsx from 'clsx';

interface Props {
  startDate: Date;
  status: BookingStatus;
}

export default function Status({
  status,
  startDate
}: Props): React.JSX.Element {
  return (
    <div className="flex gap-1.5 items-center">
      {isFinishEvent(startDate) ? (
        <>
          <div className="rounded-full w-3 h-3 bg-primary" />
          <p>Finalizada</p>
        </>
      ) : (
        <>
          <div
            className={clsx('rounded-full border-0 w-3 h-3', {
              'bg-success': status === 'ACTIVE',
              'bg-error': status === 'CANCEL'
            })}
          />
          <p>
            <>
              {status === 'ACTIVE' && 'Activa'}
              {status === 'CANCEL' && 'Cancelada'}
            </>
          </p>
        </>
      )}
    </div>
  );
}
