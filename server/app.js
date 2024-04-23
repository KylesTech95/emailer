require('dotenv').config()
const {s3} = require('./s3.js')
const pool = require('./db.js').pool
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const PORT = !process.env.PORT ? 3000 : process.env.PORT
const routes = require('./../lib/routes.js')
const middleware = require('./../lib/middleware.js');
const nodemailer = require("nodemailer")

middleware(app,express,cors,bodyParser)
routes(app,nodemailer)



app.listen(PORT,()=>console.log('You are listening on port '+PORT))