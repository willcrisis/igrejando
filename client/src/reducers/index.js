import {combineReducers} from 'redux';
import auth from './auth';
import alerts from './alerts';

const igrejandoApp = combineReducers({
  alerts,
  loggedIn: auth
});

export default igrejandoApp;
