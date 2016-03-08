import { combineReducers } from 'redux'
import actions from '../actions/constants';
import logger from '../utils/logger'


const isLoaded = (state = 0, action) =>{
   switch (action.type) {
    case actions.LOADING_START:
      return state + 1;
    case actions.LOADING_FINISH:
      return state - 1;
    default:
      return state;
  }
}

const items = (state = [], action) => {
   switch (action.type) {
    case actions.SET_HOTELS:
      return action.items;
    default:
      return state;
  }
}

const setPager = (key, state, action, initState) => {
   switch (action.type) {
    case actions.SET_PAGER:
      return action.pager[key] === undefined ? state : action.pager[key];
   default:
      return initState;
  }
}


let initPager = {
    total: 0,
    perPage: 10,
    activePage: 1,
    sort: 0,
    asc: true
}

const pager = (state = initPager, action)  => {
    switch (action.type) {
    case actions.SET_PAGER:
      return Object.assign({}, state, action.pager);
   default:
      return state;
  }
}

export const hotels = combineReducers({
    isLoaded,
    items,
    pager
})