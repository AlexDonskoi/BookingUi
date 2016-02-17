 export const stringFormat = (format, ...params) => {
    return (format || "").replace(/{(\d+)}/g, function(match, index) { 
        return typeof params[index] != 'undefined'
            ? params[index]
            : match
        ;
    });
 }

 export const numberFormat = (value, format) => {
    let combine = "" + format + value;
    return combine.substr(combine.length - format.length);
 }