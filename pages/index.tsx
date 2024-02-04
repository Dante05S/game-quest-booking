import PageProvider from '@/context/PageContext/PageProvider';
import { responseIsOk } from '@/helpers/request';
import EventService from '@/services/EventService';
import HomeView from '@/views/HomeView';
import { type GetServerSideProps } from 'next';

interface Props {
  events: Event[];
}

export default function Home({ events }: Props): React.JSX.Element {
  return (
    <PageProvider
      description="Los mejores eventos de videojuegos de latinoamerica"
      props={{ events }}
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
