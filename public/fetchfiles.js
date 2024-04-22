function fetchFiles(filer,send){
    filer.addEventListener('click',e => {
        // e.preventDefault()
        const fileSystem = e.target.files
        console.log(fileSystem)
    })

    send.addEventListener('click',e=>{
        e.preventDefault()
        console.log(filer.files)
    })
}

export default fetchFiles