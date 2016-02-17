import timeout from './stub/timeout'

export const getHotels = (filter) => {
    return new Promise(
        (resolve, reject) => 
            timeout(()  => resolve(
                Object.keys(filter).map(key => key + ": " + filter[key].join(", "))
            ))
    )
}