import actions from '../actions/constants';
import logger from '../utils/logger'


const filterGroup = (items, key, isChecked) =>{
    items = items || [];
    if(!isChecked){
        return items.filter(it => it != key);        
    }
    return [...items, key];
}

export const filter = (state = {}, action) => {
  switch (action.type) {
    case actions.TOGGLE_FILTER_ITEM:
      var groupFilter = {};
      groupFilter[action.groupKey] = filterGroup(state[action.groupKey], action.itemKey, action.isChecked)
      return Object.assign({}, state, groupFilter);
    case actions.SET_START_DATE:
      return Object.assign({}, state, 
      {
          startDate: actions.date
      });
    case actions.SET_END_DATE:
      return Object.assign({}, state, 
      {
          endDate: actions.date
      });
    default:
      return state;
  }
}