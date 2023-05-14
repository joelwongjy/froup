import { configureStore } from '@reduxjs/toolkit';

import moduleReducer from 'reducers/modulesReducer';

export const store = configureStore({
  reducer: {
    module: moduleReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {room: RoomState, code: CodeState}
export type AppDispatch = typeof store.dispatch;
