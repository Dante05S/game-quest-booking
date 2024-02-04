import PageProvider from '@/context/PageContext/PageProvider';
import BookingsView from '@/views/BookingsView';
import React from 'react';

export default function Bookings(): React.JSX.Element {
  return (
    <PageProvider title="Reservas" description="Reservas" props={null}>
      <BookingsView />
    </PageProvider>
  );
}
