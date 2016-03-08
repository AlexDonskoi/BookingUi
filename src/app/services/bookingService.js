import fetch from './etagJsonService'
import { getApiUrl, toDateFormat} from './settingsService'

export const sendBooking = ({ code, name, phone, comment, startDate, endDate, rooms}) => {
    let request = {
        hotelCode: code,
        guestName: name,
        guestPhone: phone,
        comment: comment,
        checkInDate: toDateFormat(startDate),
        checkOutDate: toDateFormat(endDate),
        roomTypes: Object.keys(rooms).map(k => { return { id: k, roomsCount: rooms[k]}})
        
    }
    return fetch(`${getApiUrl()}/src/app/services/stub/booking`, 
    {
        method: 'post',
        body: JSON.stringify(request)        
    })    
    .then(response => response.json())
}

export const findBooking = (bookingNumber) => {
    return fetch(`${getApiUrl()}/src/app/services/stub/booking.json`)
    .then(response => response.json())
}