import timeout from './stub/timeout'

let hotels = [
    {
        "Code": "one",
        "Name": "Hotel One",
        "Description": "Hotel One description",
        "Image": "#",
        "RoomTypes":[]
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
            timeout(()  => resolve(
                hotels
            ))
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