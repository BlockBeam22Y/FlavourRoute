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
    clearReservations: (state) => {
      state.reservations = null;
    }
  }
});

export const { fetchReservations, clearReservations } = reservationsSlice.actions;