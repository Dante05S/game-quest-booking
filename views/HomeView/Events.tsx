import React from 'react';
import { EventComponent } from './Event';
import { useSelector } from 'react-redux';
import { selectEvents } from '@/redux/slices/eventSlice';

export default function Events(): React.JSX.Element {
  const events = useSelector(selectEvents);

  return (
    <div className="flex flex-col py-14">
      <div className="bg-primary w-[300px] p-2 pl-5">
        <h2 className="text-4xl" id="events">
          Eventos
        </h2>
      </div>
      <div className="flex flex-wrap px-3 md:px-8 mt-10 2xl:justify-center">
        {events.map((event) => (
          <EventComponent key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
