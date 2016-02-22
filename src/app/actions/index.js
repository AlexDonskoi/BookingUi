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

export const openPage = (pageType, info) => {
    return {
        type: actions.OPEN_PAGE,
        data:{
            pageType,
            info
        }
    }
}

export const replacePage = (index, pageType, info) => {
    return {
        type: actions.REPLACE_PAGE,
        data:{
            pageType,
            info
        },
        index
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
                dispatch(openPage(pageType, 
                    Object.assign({}, item, { title: item.Code})))
                dispatch(loadingFinish())
            },
            error => {
                dispatch(loadingFinish())
                dispatch(setError(error))
            })
  }
}

export const tryBooking = (bookingInfo, index, bookingPageType) => {
  return function (dispatch, getState) {
    dispatch(loadingStart())
        return sendBooking(bookingInfo)
            .then(item =>{
                dispatch(replacePage(
                    index,
                    bookingPageType, 
                    Object.assign({}, bookingInfo, { title: "Confirmation"})))
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
                    Object.assign({}, {"number": bookingNumber}, { title: "Confirmation"})))
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


export const selectTab = (key) => {
    return {
        type: actions.SELECT_TAB,
        key
    }
}