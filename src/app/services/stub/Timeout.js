 const randomTimeout = 
(callback) =>  window.setTimeout(
                callback, Math.random() * 1000 + 500)

export default randomTimeout