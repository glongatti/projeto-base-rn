import RestService from '../services/rest';

async function getUserData() {
  return RestService.getAuthenticated('user/me');
}

export default {
  getUserData,
};
