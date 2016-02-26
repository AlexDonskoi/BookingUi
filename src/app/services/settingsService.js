import Settings from './Settings'

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

export const getBedTypeByKey = (key) => {
    let allItems = (Settings.SearchGroups.find(it => it.Key == "BedTypes") || {}).Items;
    if(!allItems)
    {
        return null
    }
    return allItems.find(it => it.Key == key);
}