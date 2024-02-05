import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../store';
import { type BookingState } from '@/interfaces/booking_state';
import { type Booking } from '@/models/Booking';

const initialState: BookingState = {
  bookings: []
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookings: (state: BookingState, action: PayloadAction<Booking[]>) => {
      return {
        ...state,
        bookings: action.payload
      };
    },
    updateBooking: (state: BookingState, action: PayloadAction<Booking>) => {
      return {
        ...state,
        bookings: state.bookings.map((booking) => {
          if (booking.id === action.payload.id) {
            return {
              ...booking,
              ...action.payload
            };
          }
          return booking;
        })
      };
    }
  }
});

export const { setBookings, updateBooking } = bookingSlice.actions;

export const selectBookings = (state: RootState): Booking[] =>
  state.booking.bookings;

export default bookingSlice.reducer;
