import { I18n } from 'react-redux-i18n';

export const ADD_ALERT = 'ADD_ALERT';
export const DISMISS_ALERT = 'DISMISS_ALERT';

const addAlert = (type, message, title, timeout) => {
  return {
    type: ADD_ALERT,
    alert: {
      id: (new Date()).getTime(),
      type,
      message: I18n.t(message),
      headline: title && I18n.t(title),
      timeout: typeof timeout === 'undefined' ? 4000 : timeout
    }
  }
};

export const addSuccessAlert = (message, title) => {
  return addAlert('success', message, title)
};

export const addInfoAlert = (message, title) => {
  return addAlert('info', message, title)
};

export const addWarningAlert = (message, title) => {
  return addAlert('warning', message, title)
};

export const addErrorAlert = (message, title) => {
  return addAlert('danger', message, title)
};

export const dismissAlert = alert => {
  return {
    type: DISMISS_ALERT,
    alert
  }
};
