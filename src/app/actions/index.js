import actions from './constants';
import { getHotels, getHotel } from '../services/hotelService';
import { sendBooking, findBooking } from '../services/bookingService';


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

const openPageInternal = (pageType, info) => {
    return {
        type: actions.SET_PAGE,
        data:{
            pageType,
            info
        }
    }
}

export const openPage = (pageType, info) => {
  return function (dispatch, getState) {
        let openPageAction = openPageInternal(pageType, info);
        dispatch(openPageAction);
  }
}

export const closePage = () => {
    return {
        type: actions.CLOSE_PAGE
    }
}

export const search = () => {
  return function (dispatch, getState) {
    dispatch(loadingStart())
        return getHotels(getState().filter, getState().hotels.pager)
            .then(result => {
                dispatch(setHotels(result.items));
                dispatch(setPager({ total: result.total }));
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
        return getHotel(hotelCode, getState().filter)
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
        return sendBooking(Object.assign({}, bookingInfo, getState().filter))
            .then(item =>{
                dispatch(openPage(
                    bookingPageType, 
                    item))
                dispatch(loadingFinish())
            },
            error => {
                dispatch(loadingFinish())
                dispatch(setError(error))
            })
  }
}

export const searchBooking = (bookingNumber, bookingPageType) => {
  return function (dispatch, getState) {
    dispatch(loadingStart())
        return findBooking(bookingNumber)
            .then(item =>{
                dispatch(openPage(
                    bookingPageType, 
                    item))
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