const postFetch = async(action,data,method) => {
    let response = await fetch(action,{
     method:method,
     mode:'cors',
     cache:"no-cache",
     credentials:"same-origin",
     headers:{"Content-Type":"application/json"},
     redirect:"follow",
     referrerPolicy:"no-referrer",
     body:JSON.stringify(data)
    })
    return response.json();
 }

function fetchFiles(form,filer,send){
    filer.addEventListener('click',e => {
        // e.preventDefault()
        const fileSystem = e.target.files
        console.log(fileSystem)
    })
    // attachments handler for images
    const submitAttachments = (event) => {
        event.preventDefault()
        let bod = {}
        const formdata = event.currentTarget;
        // const formBody = new FormData(formdata)
        const action = new URL(formdata.action).pathname
        const first = document.getElementById('first').value
        const last = document.getElementById('last').value
        const email = document.getElementById('from').value
        const subject = document.getElementById('subject').value
        const message = document.getElementById('message').value
        const file = [...Object.values(filer.files)]
                            .map(file => {
                                return {name:file.name,lastModified:file.lastModified,lastModifiedDate:file.lastModifiedDate,size:file.size,type:file.type}
                            })

        // console.log(typeof files)

        bod = {first,last,email,subject,message,file};
        const postOptions = {
            method:formdata.method,
            body: bod,
        }
        // console.log(postOptions)
        

        postFetch(action,postOptions.body,postOptions.method)
        .then(data=>{
            console.log(data)
        })
    
    }
    // add handler to event listener
    form.addEventListener('submit',submitAttachments)
}

export default fetchFiles