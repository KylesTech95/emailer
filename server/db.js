require('dotenv').config()
const dberror = require('./../lib/dberror.js')
const dbsuccess = require('./../lib/dbsuccess.js')
var colors = require('colors')
const {Pool} = require('pg')

const pool = new Pool({
    user:process.env.DBUSER34,
    host:process.env.DBHOST,
    password:process.env.DBPD,
    port:process.env.DBP,
    database: process.env.DB
})

pool.connect(async function(err){
    if(!err){
        // output: Connected to PSQL server
        dbsuccess()
    }
    else{
        dberror(err)  
    }
})


module.exports = {pool}