import { type EventState } from '@/interfaces/event_state.interface';
import { type Event } from '@/models/Event';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../store';

const initialState: EventState = {
  events: []
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEvents: (state: EventState, action: PayloadAction<Event[]>) => {
      return {
        ...state,
        events: action.payload
      };
    },
    updateEvent: (state: EventState, action: PayloadAction<Event>) => {
      return {
        ...state,
        events: state.events.map((event) => {
          if (event.id === action.payload.id) {
            return {
              ...event,
              ...action.payload
            };
          }
          return event;
        })
      };
    }
  }
});

export const { setEvents, updateEvent } = eventSlice.actions;

export const selectEvents = (state: RootState): Event[] => state.event.events;

export default eventSlice.reducer;
