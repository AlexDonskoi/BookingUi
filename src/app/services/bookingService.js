import timeout from './stub/timeout'

export const sendBooking = (state) => {
    return new Promise(
        (resolve, reject) => 
            timeout(()  =>resolve(state)
            )
    )
}

export const findBooking = (bookingNumber) => {
    return new Promise(
        (resolve, reject) => 
            timeout(()  =>resolve(bookingNumber)
            )
    )
}