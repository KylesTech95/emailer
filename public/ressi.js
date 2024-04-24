async function ressi(u,d,inp){
  let fetchvar =  await fetch(u)
        .then(res=>res.json())
        .then(data=>{
            console.log(d)
            console.log(data.auth)
            return /granted/.test(data.auth) ? inp.setAttribute('value',data.sec) : inp.setAttribute('value',data.sec)
        })
        
}


export default ressi