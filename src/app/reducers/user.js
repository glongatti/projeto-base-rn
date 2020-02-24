import {
  ACTION_LOG_OUT,
} from '../actions/user';

const initialState = {
  user: {}
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case ACTION_LOG_OUT:
      return { ...state, initialState };
    default:
      return state;
  }
}

export function isLogged(state) {
  return state.user.isLogged;
}
