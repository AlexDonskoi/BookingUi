import actions from '../actions/constants';
import logger from '../utils/logger'

export const page = (state = null, action) => {
   switch (action.type) {
    case actions.SET_PAGE:
      return action.data;
    case actions.CLOSE_PAGE:
    case actions.SET_HOTELS:
      return null;    
    default:
      return state;
  }
}