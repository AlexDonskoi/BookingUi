import actions from '../actions/constants';
import logger from '../utils/logger'

export const pages = (state = [], action) => {
   switch (action.type) {
    case actions.OPEN_PAGE:
      return [...state, action.data];
    case actions.CLOSE_PAGE:
      return state.filter((it, ind) => ind != action.index);
    case actions.REPLACE_PAGE:
      return state.map((it, ind) => action.index == ind ? action.data : it);
    
    default:
      return state;
  }
}

export const selectedTab = (state = -1, action) => {
   switch (action.type) {
    case actions.SELECT_TAB:
      return action.key;      
    case actions.SET_HOTELS:
    case actions.SET_PAGER:
      return -1;
    default:
      return state;
  }
}