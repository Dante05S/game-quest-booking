import React from 'react';
import { PageContext, type PageState } from '.';
import Meta from '@/components/Meta';
import { type Optional } from '@/types/optional.type';

interface Props<T> extends Optional<PageState<T>, 'title'> {
  children: React.ReactNode;
}

export default function PageProvider<T>({
  title = 'GameQuestBooking',
  description,
  props,
  children
}: Props<T>): React.JSX.Element {
  return (
    <PageContext.Provider
      value={{
        title,
        description,
        props
      }}
    >
      <Meta />
      {children}
    </PageContext.Provider>
  );
}
