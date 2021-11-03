import { createStore } from 'redux';
import reducers from './features/reducers';

const initialState = {
  counter: {
    value: 0,
  },
};

export const store = createStore(
  reducers,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
