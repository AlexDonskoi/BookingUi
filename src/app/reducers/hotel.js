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

const setPager = (key, state, action) => {
   switch (action.type) {
    case actions.SET_PAGER:
      return action.pager[key] || state;
   default:
      return state;
  }
}


let initPager = {
    total: 0,
    perPage: 10,
    activePage: 1,
    sort: 0
}

const pager = combineReducers(
    Object.keys(initPager).reduce(
        (aggr, key, index) =>{
            aggr[key] = (state, action) => setPager(key, state, action) || initPager[key]
            return aggr;
        }, 
        {})
)

export const hotels = combineReducers({
    isLoaded,
    items,
    pager
})