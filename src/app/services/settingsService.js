import Settings from './Settings'
import moment from 'moment'

export const getHotelFacilitiesByKeys = (keys) => {
    let allItems = (Settings.SearchGroups.find(it => it.Key == "HotelFacilities") || {}).Items;
    if(!allItems)
    {
        return []
    }
    return keys.map(facility => allItems.find(f => f.Key == facility))
                            .filter(f => !!f);
}

export const getRoomFacilitiesByKeys = (keys) => {
    let allItems = (Settings.SearchGroups.find(it => it.Key == "RoomFacilities") || {}).Items;
    if(!allItems)
    {
        return []
    }
    return keys.map(facility => allItems.find(f => f.Key == facility))
                            .filter(f => !!f);
}

export const getSearchGroups = () => {
    return Settings.SearchGroups
}

export const getSortItems = () => {
    return Settings.SortBy
}

export const getBedTypeByKey = (key) => {
    let allItems = (Settings.SearchGroups.find(it => it.Key == "BedTypes") || {}).Items;
    if(!allItems)
    {
        return null
    }
    return allItems.find(it => it.Key == key);
}

export const getApiUrl = () => {
    return Settings.Api;
}

export const toDateFormat = (date) => {
    return moment(date).format(Settings.DateFormat);
}