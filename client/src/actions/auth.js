export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
    loggedIn: true
  }
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
    loggedIn: false
  }
};
