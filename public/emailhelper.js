function getEmail(secret,input){
    fetch(secret)
        .then(res=>res.json())
        .then(data=>{
            input.value = data.sec
            console.log(data.sec)
        })
}

export default getEmail