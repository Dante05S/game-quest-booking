import { PageContext, type PageState } from '@/context/PageContext';
import { useContext } from 'react';

export default function usePage<T>(): PageState<T> {
  return useContext<PageState<T>>(PageContext as React.Context<PageState<T>>);
}
