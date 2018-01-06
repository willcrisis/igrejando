import { combineReducers } from 'redux';
import { i18nReducer } from 'react-redux-i18n';
import auth from './auth';
import alerts from './alerts';

const igrejandoApp = combineReducers({
  alerts,
  loggedIn: auth,
  i18n: i18nReducer
});

export default igrejandoApp;
