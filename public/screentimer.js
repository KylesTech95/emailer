function screentimer(window){
    const fin_time = fetch('/my-time').then(res=>res.json()).then(data=>{
        return +data.time
    })
    let timer;
    window.onblur = async () => {
    let counter = 0;
    let trueTime = await fin_time
    // console.log('tab has changed')
    timer = setInterval(()=>{
        // console.log(counter++)
        if(counter == trueTime){
            clearInterval(timer)
            window.location.href='/user-not-active'
            // // fetch('/user-not-active').then(res=>res.json()).then(data=>console.log(data))
        }
    },1000)
    }
    window.onfocus = () => {
    // console.log('browser tab is active again')
    clearInterval(timer)
    }
}

export default screentimer