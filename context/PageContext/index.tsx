import { createContext } from 'react';
import { type ResponseObjectData } from '@/types/response_data.type';

type PropsPage<T = ResponseObjectData | null> = T;

export interface PageState<T> {
  title: string;
  description: string;
  props: PropsPage<T>;
}

export const initState: PageState<null> = {
  title: '',
  description: '',
  props: null
};
export const PageContext = createContext<PageState<any>>(initState);
