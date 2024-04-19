module.exports = function(app,nodemailer){
    // routes
    app.route('/hello').get((req,res)=>{
        res.json({message:"Hello There!"})
    })
    }