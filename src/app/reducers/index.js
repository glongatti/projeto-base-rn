import { combineReducers } from 'redux';

import navigation from './navigator';
import user from './user';

import { ACTION_LOG_OUT } from '../actions/user';

const appReducer = combineReducers({
  navigation,
  user,
});

export default (state, action) => {
  if (action.type === ACTION_LOG_OUT) {
    state.navigation.index = 0;
    state.navigation.routes = [state.navigation.routes[0]];
    state.user = undefined;
  }

  return appReducer(state, action);
};
