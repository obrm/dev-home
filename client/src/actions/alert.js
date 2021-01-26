import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType, sec = 2.5) => dispatch => {
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), sec * 1000);
};
