import ressi from './ressi.js'
function getEmail(secret,input){
    fetch(secret)
        .then(res=>res.json())
        .then(data=>{
            ressi('/resolve-email',data.sec,input)
            console.log(data.sec)
        })
}

export default getEmail