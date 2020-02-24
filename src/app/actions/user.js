import { Alert } from 'react-native';

import AuthService from '../server/auth';
import UserService from '../server/user';
import Storage from '../services/storage';
import * as Navigation from './navigator';

export const ACTION_LOGIN_EMAIL_PASSWORD_IS_ON_REQUEST = 'ACTION_LOGIN_EMAIL_PASSWORD_IS_ON_REQUEST:user';
export const ACTION_LOGIN_EMAIL_PASSWORD_ERROR = 'ACTION_LOGIN_EMAIL_PASSWORD_ERROR:user';

export const ACTION_LOG_OUT = 'ACTION_LOG_OUT:user';

export const ACTION_GET_LOGGED_USER = 'ACTION_GET_LOGGED_USER:user';

export function verifyInitialFlow() {
  return async (dispatch) => {
    // const isAuthenticated = await Storage.isAuthenticated();
    // if (isAuthenticated) {
    //   await dispatch(getLoggedUser());
    //   dispatch({ type: Navigation.ACTION_OPEN_NAVIGATOR_SCREEN.action });
    // }
    //  else {
    //   dispatch({ type: Navigation.ACTION_OPEN_ONBOARDING_SCREEN.action });
    // }
    dispatch({ type: Navigation.ACTION_OPEN_LOGIN_FLOW.action });
  };
}

export function getLoggedUser() {
  return async (dispatch) => {
    try {
      const user = await UserService.getUserData();
      await Storage.createUserData(user);
      dispatch({ type: ACTION_GET_LOGGED_USER, payload: user });
    } catch (err) { /* empty */ }
  };
}

export function loginEmailPassword(email, password) {
  return async (dispatch) => {
    try {
      dispatch({ type: ACTION_LOGIN_EMAIL_PASSWORD_IS_ON_REQUEST, payload: true });
      const auth = await AuthService.loginEmailPassword(email, password);
      await Storage.createUserAuthData(auth);
    } catch (err) {
      dispatch({ type: ACTION_LOGIN_EMAIL_PASSWORD_ERROR, payload: true });
      if (err.error === 'user_not_found') {
        showAlertError(
          'Usuário não encontrado',
          'Não encontramos um usuário com esse acesso, por favor entre em contato com um representante.'
        );
      } else if (err.error === 'invalid_password') {
        showAlertError(
          'Dados inválidos',
          'A senha informada não está correta.'
        );
      }
    } finally {
      dispatch({ type: ACTION_LOGIN_EMAIL_PASSWORD_IS_ON_REQUEST, payload: false });
    }
  };
}


export function logOut() {
  return async (dispatch) => {
    try {
      await Storage.reset();
      dispatch({ type: ACTION_LOG_OUT });
      dispatch({ type: Navigation.ACTION_OPEN_LOGIN_FLOW.action });
    } catch (err) { /* empty */
    }
  };
}

function showAlertError(title, message) {
  setTimeout(() => {
    Alert.alert(
      title,
      message,
      [{
        text: 'OK',
        onPress: () => {
        }
      }],
      {
        cancelable: true
      }
    );
  }, 200);
}
