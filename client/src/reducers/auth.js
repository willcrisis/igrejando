import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/auth';

const auth = (state = false, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case LOGOUT_SUCCESS:
      return action.loggedIn;
    default:
      return state;
  }
};

export default auth;
