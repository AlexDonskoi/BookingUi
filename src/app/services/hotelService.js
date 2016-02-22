import timeout from './stub/timeout'

let hotels = [
    {
        "Code": "one",
        "Name": "Hotel One",
        "Description": "Hotel One description",
        "Image": "#",
        "RoomTypes":[{
            "Id": 1,
            "Name": "Type One",
            "RoomFacilities": ['AIR_CONDITIONER', 'TV'],
            "Rooms": 5
        },
        {
            "Id": 2,
            "Name": "Type Two",
            "RoomFacilities": ['TV'],
            "Rooms": 8
        }]
    },
    {
        "Code": "two",
        "Name": "Hotel Two",
        "Description": "Hotel Two description",
        "Image": "#",
        "RoomTypes":[]
    }
]


export const getHotels = (filter) => {
    return new Promise(
        (resolve, reject) => 
            timeout(()  =>reject("error")
            )
    )
}

export const getHotel = (hotelCode) => {
    return new Promise(
        (resolve, reject) => 
            timeout(()  => resolve(
               hotels.find(it => it.Code == hotelCode)
            ))
    )
}