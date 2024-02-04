import { type Event } from './Event';

export type BookingStatus = 'ACTIVE' | 'CANCEL';

export interface Booking {
  id: string;
  user_id: string;
  event_id: string;
  status: BookingStatus;
  event: Event;
}
