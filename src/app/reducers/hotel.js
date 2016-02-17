import { combineReducers } from 'redux'
import actions from '../actions/constants';
import logger from '../utils/logger'


const isLoaded = (state = false, action) =>{
   switch (action.type) {
    case actions.HOTELS_LOAD_STARTED:
      return true;
    case actions.HOTELS_LOAD_SUCCESS:
    case actions.HOTELS_LOAD_ERROR:
      return false;
    default:
      return state;
  }
}

const items = (state = [], action) => {
   switch (action.type) {
    case actions.HOTELS_LOAD_SUCCESS:
      return action.items;
    default:
      return state;
  }
}

export const hotels = combineReducers({
    isLoaded,
    items
})