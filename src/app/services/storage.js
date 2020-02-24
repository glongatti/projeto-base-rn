import AsyncStorage from '@react-native-community/async-storage';

export const PERSIST_KEY_IS_LOGGED = '@ProjectName:user:is_logged';
export const PERSIST_KEY_USER_DATA = '@ProjectName:user:user_data';
export const PERSIST_KEY_USER_AUTH_DATA = '@ProjectName:user:user_auth_data';

async function isAuthenticated() {
  const auth = await AsyncStorage.getItem(PERSIST_KEY_USER_AUTH_DATA);
  const isLogged = await AsyncStorage.getItem(PERSIST_KEY_IS_LOGGED);
  return (auth && isLogged);
}

async function getUserAuthData() {
  if (isAuthenticated()) return JSON.parse(await AsyncStorage.getItem(PERSIST_KEY_USER_AUTH_DATA));
}

async function getUserData() {
  if (isAuthenticated()) return JSON.parse(await AsyncStorage.getItem(PERSIST_KEY_USER_DATA));
}

async function getUserAuthToken() {
  if (isAuthenticated()) return JSON.parse(await AsyncStorage.getItem(PERSIST_KEY_USER_AUTH_DATA)).token;
}

async function getUserAuthRefreshToken() {
  if (isAuthenticated()) return JSON.parse(await AsyncStorage.getItem(PERSIST_KEY_USER_AUTH_DATA)).refreshToken;
}

async function getUserName() {
  if (isAuthenticated()) return JSON.parse(await AsyncStorage.getItem(PERSIST_KEY_USER_DATA)).name;
}

async function createUserAuthData(auth) {
  await AsyncStorage.setItem(PERSIST_KEY_USER_AUTH_DATA, JSON.stringify(auth));
}

async function createUserData(user) {
  await AsyncStorage.setItem(PERSIST_KEY_IS_LOGGED, JSON.stringify(true));
  await AsyncStorage.setItem(PERSIST_KEY_USER_DATA, JSON.stringify(user));
}

async function reset() {
  await AsyncStorage.setItem(PERSIST_KEY_IS_LOGGED, JSON.stringify(false));
  await AsyncStorage.removeItem(PERSIST_KEY_USER_DATA);
  await AsyncStorage.removeItem(PERSIST_KEY_USER_AUTH_DATA);
}

export default {
  getUserAuthData,
  getUserData,
  getUserAuthToken,
  getUserAuthRefreshToken,
  getUserName,
  createUserAuthData,
  createUserData,
  reset,
  isAuthenticated
};
