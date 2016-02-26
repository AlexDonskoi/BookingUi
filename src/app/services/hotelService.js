import fetch from 'isomorphic-fetch'
import moment from 'moment'
import Settings from './Settings'

const getFilterQuery = (filter) => {
    let queryStringArray = [];
    if(filter.startDate)
    {
        queryStringArray.push(`CheckInDate=${moment(filter.startDate).format(Settings.DateFormat)}`)
    }
    if(filter.endDate)
    {
        queryStringArray.push(`CheckOutDate=${moment(filter.endDate).format(Settings.DateFormat)}`)
    }
    
    Settings.SearchGroups.forEach(it => {
        var values = filter[it.Key];
        if(values)
        {
           queryStringArray.push(`${it.Key}=${values}`) 
        }
    });
    return queryStringArray;
}

export const getHotels = (filter, pager) => {
    let queryStringArray = getFilterQuery(filter);
    
    if(pager.activePage)
    {
        queryStringArray.push(`Page=${pager.activePage}`)
    }
    if(pager.perPage)
    {
        queryStringArray.push(`PageSize=${pager.perPage}`)
    }
    
    return fetch(`${Settings.Api}/src/app/services/stub/hotels.json?${queryStringArray.join("&")}`, 
    {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    .then(response => response.json())
}

export const getHotel = (hotelCode, filter) => {
    let queryStringArray = getFilterQuery(filter);
    return fetch(`${Settings.Api}/src/app/services/stub/hotels/${hotelCode}.json?${queryStringArray.join("&")}`, 
    {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    .then(response => response.json())
}