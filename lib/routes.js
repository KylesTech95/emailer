require('dotenv').config()
const capFn = require('./capfn')
const path = require('path')
module.exports = function(app,nodemailer){
    // routes
    app.route('/hello').get((req,res)=>{
        res.json({message:"Hello There!"})
    })
    app.route('/get-email').get((req,res)=>{
        res.json({sec:process.env.USIN})
    })
    app.route('/send-email').post(async(req,res)=>{
        const { first,last,from,to,subject,message,cc,bcc,file } = req.body
        // let transporter = nodemailer.createTransport({
        //     service: process.env.E_SERVICE,
        //     auth:{
        //         user:process.env.USIN,
        //         pass:process.env.PSWD
        //     }
        // })
        // let mapped_attachments = [...file].map(f=>{
        //     // console.log({filename:f,path:`./media/${f}`})
        //    return {
        //     filename:f,
        //     path:`./media/${f}`
        //     }
        // })
        // // mail options (who send what to whom)
        // let mailOptions = {
        //     from, //from field
        //     to, //to field
        //     cc, // carbon-copy
        //     bcc,//blind carbon copy
        //     subject,//subject
        //     text:message,//text:message(textarea) field
        //     attachments: !file ? undefined : /string/i.test(typeof(file)) ? {filename:file, path:`./media/${file}`} : mapped_attachments //file field
        // }
        // mailOptions.text+='\n\nName: '+capFn(first)+' '+capFn(last)+'\nEmail: '+from
        // // start sending mailOptions info
        // transporter.sendMail(mailOptions, function(err,info){
        //     try{
        //         // console.log('email send: ' + info.response)
        //         // console.log(info)
        //         // console.log(mailOptions)
        //         // console.log('Message Sent!')
        //         console.log(req.body)
        //         res.json({data:file})
        //         // res.json({message:'sent!'})
        //     }
        //     catch{
        //         console.log(err)
        //         // res.json({message:'failed to send'})
        //     }
        // })
        console.log(req.body)
        res.json({data:req.body})
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