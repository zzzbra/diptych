import { configureStore } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/dist/query';
import baseApi from './services/baseApi';
import counterReducer from '../features/counter/counter.slice';
import authReducer from '../features/auth/auth.slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for
// customization
// setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
