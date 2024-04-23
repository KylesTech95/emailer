require('dotenv').config()
const s3 = require('./s3.js')
const pool = require('./db.js').pool
const multer = require('multer')
const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const PORT = !process.env.PORT ? 3000 : process.env.PORT
const routes = require('./../lib/routes.js')
const middleware = require('./../lib/middleware.js');
const nodemailer = require("nodemailer")
const multerS3=require('multer-s3-v3');
middleware(app,express,cors,bodyParser)
routes(app,nodemailer,pool)


const storage = multerS3({
      s3: s3,
      bucket: process.env.AWS_BCKET,
      metadata: function (req, file, cb) {
        cb(null, {originalname: file.originalname});
      },
      key: function (req, file, cb) {
        const uniqueSuff = `${Date.now()}-${Math.round(Math.random()*1E9)}`;
        cb(null,uniqueSuff + path.extname(file.originalname))
      }
    })


app.listen(PORT,()=>console.log('You are listening on port '+PORT))