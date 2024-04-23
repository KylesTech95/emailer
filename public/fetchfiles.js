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
 const getFetch = (url) => {
    let resp = fetch(url).then(res=>res.json()).then(data=>{
        // console.log(data.sec)
        return data.sec
    })
    return resp;
 }
 const handleFiles = (event) => {
    const fileSystem = event.target.files
    // console.log(fileSystem)

 }

function fetchFiles(form,filer,send){
    const me_to = '/get-email'
    filer.addEventListener('click',e => {
        // e.preventDefault()
        const fileSystem = e.target.files
        // console.log(fileSystem)
        
    })
    filer.addEventListener('change',handleFiles,false)
    // attachments handler for images
    const submitAttachments = async (event) => {
        event.preventDefault()
        let bod = {}
        const formdata = event.currentTarget;
        // const formBody = new FormData(formdata)
        const action = new URL(formdata.action).pathname
        const first = document.getElementById('first').value
        const to = await getFetch(me_to) // fetch for mailbox name
        const last = document.getElementById('last').value
        const from = document.getElementById('from').value
        const subject = document.getElementById('subject').value
        const message = document.getElementById('message').value
        const file = [...Object.values(filer.files)]
                            .map(file => {
                                // return {name:file.name,lastModified:file.lastModified,lastModifiedDate:file.lastModifiedDate,size:file.size,type:file.type}
                                return file.name
                            })

        // console.log(typeof files)

        bod = {first,last,from,to,subject,message,file};
        const postOptions = {
            to_form:{
                method:formdata.method,
                body: bod,
            },
            to_db:{
                method:formdata.method,
                body: {file},
            }
        }
        // console.log(postOptions)
        

        postFetch(action,postOptions.to_form.body,postOptions.to_form.method)
        .then(data=>{
            // console.log(data)
            console.log(data.message)
        })
        postFetch('/insert-db',postOptions.to_db.body,postOptions.to_db.method)
        .then(data=>{
            console.log(data.files)
        })
    
    }
    // add handler to event listener
    form.addEventListener('submit',submitAttachments)
}

export default fetchFiles