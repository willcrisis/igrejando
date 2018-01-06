import { ADD_ALERT, DISMISS_ALERT } from '../actions/alerts';

const alerts = (state = [], action) => {
  switch (action.type) {
    case ADD_ALERT:
      return [
        action.alert,
        ...state
      ];
    case DISMISS_ALERT:
      const index = state.indexOf(action.alert);
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
    default:
      return state;
  }
};

export default alerts;
