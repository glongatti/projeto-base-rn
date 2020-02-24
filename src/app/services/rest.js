import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import fetch from 'react-native-fetch-polyfill';
import PreferencesData from './preferences';
import Storage from './storage';
import ErrorService from './error';
import NavigatorService from './navigator';
import AuthService from '../server/auth';
import * as UserActions from '../actions/user';

function showAlertError(title, message) {
  setTimeout(() => {
    Alert.alert(
      title,
      message,
      [{
        text: 'OK',
        onPress: () => {}
      }],
      {
        cancelable: true
      }
    );
  }, 200);
}

function isStringValidJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

async function request(method, uri, data = null, headers = {}, retry = 0) {
  if (!headers['Content-Type']) headers['Content-Type'] = 'application/json';

  try {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      showAlertError(
        'OPS... Sem conexão',
        'Você está sem conexão com a internet, tente novamente mais tarde...'
      );
      return Promise.reject();
    }

    const response = await fetch(`${PreferencesData.endpoint}${uri}`, {
      method,
      headers,
      body: data,
      timeout: PreferencesData.timeout
    });

    const text = await response.text();
    let result = {};
    if (isStringValidJson(text)) {
      result = JSON.parse(text);
    }
    if (!response.ok) {
      const isRefreshToken = method === 'post' && uri.includes('refresh');

      const isAuthenticated = await Storage.isAuthenticated();
      if (isAuthenticated && ErrorService.isInvalidToken(response) && !isRefreshToken) {
        if (retry === 1) {
          showAlertError('Sessão expirou...', 'Faça o login novamente, por favor...');
          NavigatorService.navigate(UserActions.logOut());

          return Promise.reject();
        }
        try {
          const refreshToken = await Storage.getUserAuthRefreshToken();
          const auth = await AuthService.refreshToken(refreshToken);
          await Storage.createUserAuthData(auth);
          headers.Authorization = `Bearer ${auth.token}`;
          return request(method, uri, data, headers, retry + 1);
        } catch (err) {
          showAlertError('Sessão expirou...', 'Faça o login novamente, por favor...');
          NavigatorService.navigate(UserActions.logOut());
          return Promise.reject(err);
        }
      } else if (
        result.error === 'user_not_found'
        || result.error === 'cellphone_not_authorized'
        || result.error === 'invalid_id'
        || result.error === 'invalid_password'
        || result.error === 'entity_not_found'
        || result.error === 'cellphone_already_used'
      ) {
        return Promise.reject(Object.assign(new Error(), { error: result.error }));
      } else {
        showAlertError('OPS...', 'Ocorreu um erro, tente novamente mais tarde...');
        return Promise.reject(Object.assign(new Error(), result.error));
      }
    }

    if (result.error) {
      return Promise.reject(Object.assign(new Error(), result.error));
    }

    if (result.success) {
      return result.data;
    }

    return result;
  } catch (err) {
    throw err;
  }
}

function publicHeader(header = {}) {
  header['Content-Type'] = 'application/json';
  return header;
}

async function getRest(uri, query, header) {
  if (query) {
    const queryParams = Object.keys(query)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
      .join('&');
    uri = uri.concat('?').concat(queryParams);
  }

  return request('get', uri, null, publicHeader(header));
}

async function postRest(uri, data, header) {
  return request('post', uri, JSON.stringify(data), publicHeader(header));
}

async function authenticatedHeader(header = {}) {
  const token = await Storage.getUserAuthToken();
  if (token) header.Authorization = `Bearer ${token}`;
  return header;
}

async function getAuthenticated(uri, query, data, header) {
  if (query) {
    const queryParams = Object.keys(query)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
      .join('&');
    uri = uri.concat('?').concat(queryParams);
  }
  header = await authenticatedHeader(header);
  return request('get', uri, JSON.stringify(data), header);
}

async function postAuthenticated(uri, data = {}, header) {
  header = await authenticatedHeader(header);
  return request('post', uri, JSON.stringify(data), header);
}

async function putAuthenticated(uri, data = {}, header) {
  header = await authenticatedHeader(header);
  return request('put', uri, JSON.stringify(data), header);
}

export default {
  getRest,
  postRest,
  getAuthenticated,
  postAuthenticated,
  putAuthenticated
};
