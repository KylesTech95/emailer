require('dotenv').config()
const capFn = require('./capfn')
const path = require('path')
let media = !process.env.COS_DR ? 'media' : process.env.COS_DR

// truncate db
// truncate images;alter sequence images_id_seq restart with 1;

module.exports = function(app,nodemailer,pool){
    //functions
    const insertFileIntoDB = async(file,pool) => {
        if(!file)console.log('no files to work with')
        if(!pool)console.log('pool is not read for db use')

        if(file&&pool){
            for(let i = 0; i < file.length; i++){
                await pool.query("insert into images(image_key) values($1)",[file[i]])
            }
        }
    }
    const noCoppiedFiles = (file,arg) => {
    // iterate through arg array
    for(let i = 0; i < arg.length; i++){
        // if file has same image name as arg[i] in the database
        if(file.includes(arg[i].image_key)){
            // splice the image name from [file] with indexOf() & take that "1" out of the array        
            file.splice(file.indexOf(arg[i].image_key),1)
            }
        // return modified file
        }
        return file
    }


    // routes
    app.route('/hello').get((req,res)=>{

        res.json({message:"Hello There!"})
    })
    app.route('/get-email').get((req,res)=>{
        res.json({sec:process.env.USIN})
    })
    app.route('/send-email').post(async(req,res)=>{
        const { first,last,from,to,subject,message,cc,bcc,file } = req.body
        // compare files to the database
        const getFiles = await pool.query('select * from images order by id desc')
        const files_argument = getFiles.rows;
        let myf = noCoppiedFiles(file,files_argument)
        let transporter = nodemailer.createTransport({
            service: process.env.E_SERVICE,
            auth:{
                user:process.env.USIN,
                pass:process.env.PSWD
            }
        })
        let mapped_attachments = [...myf].map(f=>{
           return {
            filename:f,
            path:`${media}/${f}`
            }
        })
        // mail options (who send what to whom)
        let mailOptions = {
            from, //from field
            to, //to field
            cc, // carbon-copy
            bcc,//blind carbon copy
            subject,//subject
            text:message,//text:message(textarea) field
            attachments: !myf ? undefined : /string/i.test(typeof(myf)) ? {filename:myf, path:`${media}/${myf}`} : mapped_attachments //file field
        }
        mailOptions.text+='\n\nName: '+capFn(first)+' '+capFn(last)+'\nEmail: '+from
        // start sending mailOptions info
        transporter.sendMail(mailOptions, function(err,info){
            try{
                // console.log('email send: ' + info.response)
                // console.log(info)
                // console.log(mailOptions)
                console.log('Message Sent!')
                console.log(mailOptions.attachments)
                res.json({message:'sent!'})
            }
            catch{
                console.log(err)
                res.json({message:'failed to send'})
            }
        })
    })
    app.route('/insert-db').post(async(req,res)=>{
        let {file} = req.body
        try{
            if(!file){
                res.json({files:'no files inserted'})
            }
            else{
                // get files to compare with input
                const getFiles = await pool.query('select * from images order by id desc')
                const files_argument = getFiles.rows;
                let myf = noCoppiedFiles(file,files_argument)
                insertFileIntoDB(myf,pool)
                // console.log(myf)
                res.json({files:myf})
            }
        }
        catch(err){
            console.log(err)
        }
    })
    
    // fetch file attachments (if any)
    // app.route('/send-email').get((req,res)=>{
    //     const { file } = req.params.file
    //     console.log(file)
    // })
    // show the user that they are not active anymore
    app.route('/user-not-active').get((req,res)=>{
        res.json({message: 'user not active'})
    })
    app.route('/my-time').get((req,res)=>{
        res.json({time:!process.env.TIMER ? 300 : process.env.TIMER})
    })
    // app.route('/path-assist').get((req,res)=>{
    //     res.redirect('/')
    // })
    
}