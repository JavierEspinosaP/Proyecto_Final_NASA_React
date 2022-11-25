const mail = require('../models/mailModels')
const transporter = require('../utils/nodemailer');
require('dotenv').config();
const bcrypt = require('bcryptjs');

 
const recoverMail = async (req, res) => {

    const {email} = req.body
    
    
    const randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
    let token = randomToken(16); // example output → '3ZGErMDCwxTOZYFp'
    try {
        // console.log("esto es el email y el token: ", email, token);

        await transporter.sendMail({
            from: `${process.env.USER_TRANSPORT}`,
            to: email,
            subject: 'Recuperación de contraseña',
            html: `<h3>Introduce esta contraseña temporal para acceder a tu perfil</h3>
                <p>Contraseña: ${token}</p>`
        })

        const hash = await bcrypt.hash(token, 10)
        await mail.changePassword({ password: hash, email: email })


    } catch (error) {
        console.log('Error:', error)
    }
}

module.exports = {recoverMail}