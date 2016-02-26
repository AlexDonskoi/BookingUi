import actions from '../actions/constants';
import logger from '../utils/logger'

export const error = (state = null, action) => {
   switch (action.type) {
    case actions.SET_ERROR:
      return action.content;
    default:
      return state;
  }
}