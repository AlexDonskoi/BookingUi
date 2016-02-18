import actions from './constants';
import { getHotels } from '../services/hotelService';


export const toggleFilterItem = (groupKey, itemKey, isChecked) => {
    return {
        type: actions.TOGGLE_FILTER_ITEM,
        groupKey,
        itemKey,
        isChecked
    }
}

export const setStartDate = (date) => {
    return {
        type: actions.SET_START_DATE,
        date
    }
}

export const setEndDate = (date) => {
    return {
        type: actions.SET_END_DATE,
        date
    }
}

export const hotelsLoadStarted = () => {
    return {
        type: actions.HOTELS_LOAD_STARTED
    }
}

export const hotelsLoadError = () => {
    return {
        type: actions.HOTELS_LOAD_ERROR
    }
}

export const hotelsLoadSuccess = (items) => {
    return {
        type: actions.HOTELS_LOAD_SUCCESS,
        items
    }
}

export const openPage = (pageType, hotel) => {
    return {
        type: actions.OPEN_PAGE,
        data:{
            pageType,
            hotel
        }
    }
}

export const closePage = (index) => {
    return {
        type: actions.CLOSE_PAGE,
        index
    }
}

export const search = () => {
  return function (dispatch, getState) {
    dispatch(hotelsLoadStarted())
        return getHotels(getState().filter)
            .then(items =>
                dispatch(hotelsLoadSuccess(items))
      )
  }
}