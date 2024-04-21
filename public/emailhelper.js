function getEmail(secret,input){
    fetch(secret)
        .then(res=>res.json())
        .then(data=>{
            input.value = data.sec
        })
}

export default getEmail