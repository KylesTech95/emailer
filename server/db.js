require('dotenv').config()
const {Pool} = require('pg')

const pool = new Pool({
    user:process.env.DBUSER34,
    host:process.env.DBHOST,
    password:process.env.DBPD,
    port:process.env.DBP,
    database: process.env.DB
})

const getData = async(pool) => {
    let data = await pool.query('select * from images;')
    const rows = data.rows
    console.log(rows)
    // console.log(pool)
}

getData(pool)