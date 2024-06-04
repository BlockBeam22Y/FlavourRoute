import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reservations: null
};

export const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    fetchReservations: (state, action) => {
      state.reservations = action.payload;
    },
    cancelReservation: (state, action) => {
      const idx = state.reservations.findIndex(reservation => reservation.id === action.payload.id);
      state.reservations = state.reservations.toSpliced(idx, 1, action.payload);
    },
    clearReservations: (state) => {
      state.reservations = null;
    }
  }
});

export const { fetchReservations, cancelReservation, clearReservations } = reservationsSlice.actions;