import RestService from '../services/rest';

async function loginEmailPassword(email, password) {
  return RestService.postRest('auth/student', {
    email,
    password,
  });
}


export default {
  loginEmailPassword,
};
