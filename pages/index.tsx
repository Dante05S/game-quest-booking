import PageProvider from '@/context/PageContext/PageProvider';
import { responseIsOk } from '@/helpers/request';
import { type PusherMessage } from '@/interfaces/pusher_message';
import { type Event } from '@/models/Event';
import { setEvents, updateEvent } from '@/redux/slices/eventSlice';
import { type AppDispatch } from '@/redux/store';
import EventService from '@/services/EventService';
import pusher from '@/utils/pusher';
import HomeView from '@/views/HomeView';
import { type GetServerSideProps } from 'next';
import { type Channel } from 'pusher-js';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

interface Props {
  events: Event[];
}

export default function Home({ events }: Props): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const refChannel = useRef<Channel | null>(null);

  useEffect(() => {
    dispatch(setEvents(events));
    refChannel.current = pusher.subscribe('home-channel');
    if (refChannel.current !== null) {
      refChannel.current.bind(
        'change-quota',
        (data: PusherMessage<{ event: Event }>) => {
          dispatch(updateEvent(data.message.event));
        }
      );
    }
    return () => {
      if (refChannel.current !== null)
        pusher.unsubscribe(refChannel.current.name);
    };
  }, []);

  return (
    <PageProvider
      description="Los mejores eventos de videojuegos de latinoamerica"
      props={null}
    >
      <HomeView />
    </PageProvider>
  );
}

export const getServerSideProps = (async () => {
  const eventService = new EventService();
  const response = await eventService.getAll(true);
  let events: Event[] = [];
  if (responseIsOk(response.success, response.data)) {
    events = response.data!;
  }
  // Return the data as props
  return {
    props: { events }
  };
}) satisfies GetServerSideProps<{ events: Event[] }>;
