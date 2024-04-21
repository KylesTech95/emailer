import getEmail from './emailhelper.js'
const secret = '/get-email'
let to_field = document.getElementById('to-input')
getEmail(secret,to_field)


