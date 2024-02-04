import PageLayout from '@/layouts/PageLayout';
import React from 'react';
import VideoStock from './VideoStock';
import Events from './Events';

export default function HomeView(): React.JSX.Element {
  return (
    <PageLayout>
      <VideoStock />
      <Events />
    </PageLayout>
  );
}
