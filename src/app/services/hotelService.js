import { getApiUrl, toDateFormat, getSearchGroups} from './settingsService'
import fetch from './etagJsonService'

const getFilterQuery = (filter) => {
    let queryStringArray = [];
    if(filter.startDate)
    {
        queryStringArray.push(`CheckInDate=${toDateFormat(filter.startDate)}`)
    }
    if(filter.endDate)
    {
        queryStringArray.push(`CheckOutDate=${toDateFormat(filter.endDate)}`)
    }
    
    getSearchGroups().forEach(it => {
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
    
    return fetch(`${getApiUrl()}/src/app/services/stub/hotels.json?${queryStringArray.join("&")}`)
    .then(response =>
        response.json()
            .then(json =>
            {
                return {
                        total: response.headers.get("X-Total-Count"),
                        items: json
                    }
            })
    )
}

export const getHotel = (hotelCode, filter) => {
    let queryStringArray = getFilterQuery(filter);
    return fetch(`${getApiUrl()}/src/app/services/stub/hotels/${hotelCode}.json?${queryStringArray.join("&")}`)
    .then(result => result.json())
}