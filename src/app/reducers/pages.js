import actions from '../actions/constants';
import logger from '../utils/logger'

export const pages = (state = [], action) => {
   switch (action.type) {
    case actions.OPEN_PAGE:
      return [...state, action.data];
    case actions.CLOSE_PAGE:
      return state.filter((it, ind) => ind != action.index);
    default:
      return state;
  }
}