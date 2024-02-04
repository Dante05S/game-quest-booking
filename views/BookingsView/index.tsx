import { responseIsOk } from '@/helpers/request';
import useAlertControl from '@/hooks/userAlertControl';
import PageLayout from '@/layouts/PageLayout';
import { type Booking } from '@/models/Booking';
import { selectToken } from '@/redux/slices/userSlice';
import BookingService from '@/services/BookingService';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BookingComponent from './Booking';
import Loading from '@/components/Loading';
import AlertControl from '@/components/Display/Modal/AlertControl';

function ListBookings(): React.JSX.Element {
  const token = useSelector(selectToken);
  const { openAlert } = useAlertControl();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fecthBookings = async (): Promise<void> => {
    setLoading(true);
    const bookingService = new BookingService();
    const response = await bookingService.getAllByUser(token ?? '');
    if (!responseIsOk(response.success, response.data)) {
      openAlert('error', response.errors);
      return;
    }
    setBookings(response.data!);
    setLoading(false);
  };

  useEffect(() => {
    if (token !== null) {
      void fecthBookings();
    }
  }, [token]);
  return (
    <Loading loading={loading} title={<p>Cargando Reservas...</p>}>
      <div className="flex flex-wrap px-3 md:px-8 mt-10 2xl:justify-center">
        {bookings.map((booking) => (
          <BookingComponent key={booking.id} booking={booking} />
        ))}
      </div>
    </Loading>
  );
}

export default function BookingsView(): React.JSX.Element {
  return (
    <PageLayout isAuth>
      <AlertControl>
        <div className="flex flex-col py-8 pb-10">
          <div className="bg-primary w-[300px] p-2 pl-5">
            <h2 className="text-4xl" id="events">
              Reservas
            </h2>
          </div>
          <ListBookings />
        </div>
      </AlertControl>
    </PageLayout>
  );
}
