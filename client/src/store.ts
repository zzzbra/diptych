import { configureStore } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/dist/query';
import baseApi from './services/baseApi';
import authReducer from './features/auth/auth.slice';
import modalStackReducer from './features/modalStack/modalStack.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modalStack: modalStackReducer,
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
