const S3 = require('aws-sdk/clients/s3')
require('dotenv').config()

const bucket = process.env.AWS_BCKET
const region = process.env.AWS_REG
const acc_key = process.env.AWS_ACCESS_KEY
const sec_key = process.env.AWS_SEC_KEY

const s3 = new S3({
    region,
    acc_key,
    sec_key
})
module.exports = {s3}