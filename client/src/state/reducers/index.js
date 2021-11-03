import { combineReducers } from 'redux';
import todosReducer from './todosReducer';
import usersReducer from './usersReducer';

const reducers = combineReducers({
  todos: todosReducer,
  users: usersReducer,
});

export default reducers;
