import { combineReducers } from 'redux';
// import todosReducer from './todos/reducers';
// import userReducer from './user/reducers';
import counterReducer from './counter/reducers';

const reducers = combineReducers({
  // todos: todosReducer,
  // user: userReducer,
  counter: counterReducer,
});

export default reducers;
