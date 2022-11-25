require('dotenv').config();
const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.eu',
        secure: true,
        port: 465,
        auth: {
            user: `${process.env.USER_TRANSPORT}`,
            pass: `${process.env.USER_PASSWORD}`
        },
})
    

module.exports = transporter