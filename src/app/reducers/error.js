import actions from '../actions/constants';
import logger from '../utils/logger'

export const error = (state = null, action) => {
   switch (action.type) {
    case actions.SHOW_ERROR:
      return action.content;
    case actions.CLEAR_ERROR:
      return null;
    default:
      return state;
  }
}