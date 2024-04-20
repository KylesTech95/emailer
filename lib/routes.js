module.exports = function(app,nodemailer){
    // routes
    app.route('/hello').get((req,res)=>{
        res.json({message:"Hello There!"})
    })

    app.route('/send-email').post(async(req,res)=>{
        const { from,to,subject,message,cc,bcc } = req.body

        let transporter = nodemailer.createTransport({
            service: process.env.E_SERVICE,
            auth:{
                user:process.env.USER,
                pass:process.env.PW
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
        }
        mailOptions.text+='\n'+from
        // start sending mailOptions info
        transporter.sendMail(mailOptions, function(err,info){
            try{
                // console.log('email send: ' + info.response)
                console.log(info)
                console.log(mailOptions)
            }
            catch{
                console.log(err)
            }
        })
        
        res.redirect('/')
    })
    }