module.exports = function(app,nodemailer){
    // routes
    app.route('/hello').get((req,res)=>{
        res.json({message:"Hello There!"})
    })

    app.route('/send-email').post(async(req,res)=>{
        const { from,to,subject,message } = req.body

        let transporter = nodemailer.createTransport({
            service: process.env.E_SERVICE,
            auth:{
                user:process.env.USER,
                pass:process.env.PW
            }
        })
        // mail options (who send what to whom)
        let mailOptions = {
            from,
            to,
            subject,
            text:message
        }
        // start sending mailOptions info
        transporter.sendMail(mailOptions, function(err,info){
            try{
                // console.log('email send: ' + info.response)
                console.log(info)
            }
            catch{
                console.log(err)
            }
        })
        
        res.redirect('/')
    })
    }