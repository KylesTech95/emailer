module.exports = function(err){
    let newError, env_details, deeper_look,hint
    // errors
    if(/getaddrinfo|ENOTFOUND/g.test(err)){
        newError = `1) Within the new Pool instance, verify the "user" & "host" fields\n2) Reinstall packages with "npm install pg" or "npm i -y"`.cyan
        env_details = `\n3) Dotevn Configuration:\n If environment variables are used, "npm install dotenv --save".\n At the top of the file, include "require('dotenv').config()" or "import 'dotenv/config'"`.green
        deeper_look = `\n4) Read below for a deeper look...`.cyan
        const err_v2_host = newError+env_details+deeper_look
        console.log("Daddy's Error Messages:\n"+err_v2_host+'\n\nOriginal Error Messages\n'+err.stack)
    }
    if(err.routine == 'InitializeSessionUserId'){
        hint = 'role/user'.red
        newError="1) Within the new Pool instance,verify the ".cyan + hint
        deeper_look = `\n2) Read below for a deeper look...`.cyan
        const err_v2_port=newError+deeper_look
        console.log("Daddy's Error Messages:\n"+err_v2_port+'\n\nOriginal Error Messages\n'+err.stack)
    }
    if(err.code && err.code=='ECONNREFUSED'){
        hint = 'TCP port'.red
        newError="1) Within the new Pool instance,verify the ".cyan + hint
        deeper_look = `\n2) Read below for a deeper look...`.cyan
        const err_v2_port=newError+deeper_look
        console.log("Daddy's Error Messages:\n"+err_v2_port+'\n\nOriginal Error Messages\n'+err.stack)
    }
    }