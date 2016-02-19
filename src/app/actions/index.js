import actions from './constants';
import { getHotels, getHotel } from '../services/hotelService';
import { sendBooking } from '../services/bookingService';


export const toggleFilterItem = (groupKey, itemKey, isChecked) => {
    return {
        type: actions.TOGGLE_FILTER_ITEM,
        groupKey,
        itemKey,
        isChecked
    }
}

export const setFilter = (filter) => {
    return {
        type: actions.SET_FILTER,
        filter
    }
}

export const setPager = (pager) => {
    return {
        type: actions.SET_PAGER,
        pager
    }
}

export const loadingStart = () => {
    return {
        type: actions.LOADING_START
    }
}

export const loadingFinish = () => {
    return {
        type: actions.LOADING_FINISH
    }
}

export const setHotels = (items) => {
    return {
        type: actions.SET_HOTELS,
        items
    }
}

export const openPage = (pageType, info) => {
    return {
        type: actions.OPEN_PAGE,
        data:{
            pageType,
            info
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
    dispatch(loadingStart())
        return getHotels(getState().filter)
            .then(items => {
                dispatch(setHotels(items));
                dispatch(setPager({ total: 25 }));
                dispatch(loadingFinish())
            },
            error => {
                dispatch(loadingFinish())
                dispatch(setError(error))
            })
  }
}

export const showHotel = (hotelCode, pageType) => {
  return function (dispatch, getState) {
    dispatch(loadingStart())
        return getHotel(hotelCode)
            .then(item =>{
                dispatch(openPage(pageType, item))
                dispatch(loadingFinish())
            },
            error => {
                dispatch(loadingFinish())
                dispatch(setError(error))
            })
  }
}

export const tryBooking = (bookingInfo, bookingPageType) => {
  return function (dispatch, getState) {
    dispatch(loadingStart())
        return sendBooking(bookingInfo)
            .then(item =>{
                dispatch(openPage(bookingPageType, bookingInfo))
                dispatch(closePage(getState().pages.length - 2))
                dispatch(loadingFinish())
            },
            error => {
                dispatch(loadingFinish())
                dispatch(setError(error))
            })
  }
}


export const setError = (content) => {
    return {
        type: actions.SET_ERROR,
        content
    }
}