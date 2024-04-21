import getEmail from './emailhelper.js'
import screentimer from './screentimer.js'
const secret = '/get-email'
let to_field = document.getElementById('to')
getEmail(secret,to_field)
screentimer(window)
