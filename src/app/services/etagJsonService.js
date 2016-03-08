import fetch from 'isomorphic-fetch'
import cache from 'js-cache'

const fetchJson = (response) => 
{
    return response.json()
        .then(json =>{
            return {
                json: () => new Promise(resolve => resolve(json)),
                headers: response.headers                
            }
        });
        
}

const fetchWithCache = (url, settings = {}) => 
{
    var isGet = (settings.method || "get").toLowerCase() == "get";
    let request = cache.get(url);
    var etagSettings = Object.assign({}, settings);
    etagSettings.headers = Object.assign({},
        {
            "Content-Type": "application/json",
            "Accept": "application/json"
        });
    if(isGet && request){
        Object.assign(etagSettings.headers,
        {
            "If-None-Match": request.ETag
        })
    }
    Object.assign(etagSettings.headers, 
        settings.headers)
    return fetch(url, etagSettings)    
        .then(response => 
        {
            if(response.status == 304)
            {
                return request.Result;
            }
            return fetchJson(response)
                .then(result => {
                   var etagValue = result.headers.get("ETag");
            
                    if(etagValue)
                        cache.set(
                            url,  
                            {
                                ETag: etagValue,
                                Result: result
                            },
                            5*60*1000)
                    return result;    
                })
        })
}

export default fetchWithCache