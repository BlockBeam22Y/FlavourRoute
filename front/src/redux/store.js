import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './userReducer';
import { reservationsSlice } from './reservationsReducer';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    reservations: reservationsSlice.reducer
  }
});

export default store;