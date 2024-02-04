import React from 'react';
import usePage from '@/hooks/usePage';
import { type HomeProps } from '@/interfaces/pages/home_props.interface';
import { EventComponent } from './Event';

export default function Events(): React.JSX.Element {
  const { props } = usePage<HomeProps>();

  return (
    <div className="flex flex-col py-20">
      <div className="bg-primary w-64 p-2 pl-5">
        <h2 className="text-4xl" id="events">
          Eventos
        </h2>
      </div>
      <div className="flex flex-wrap px-8 mt-12 2xl:justify-center">
        {props.events.map((event) => (
          <EventComponent key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
