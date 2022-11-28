const mail = require('../models/mailModels')
const transporter = require('../utils/nodemailer');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const clipboard = require('./clipboard.js')

 
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
            html: `

            <div style="display: flex; flex-direction:column; justify-content:center">
                    <div style="
                            margin: 0 auto;
                            padding: 200px;
                            font-family: monospace;
                            color: #EAF6FF;
                            background-color: #2A2A72;
                            text-align:center; 
                            align-content:center; 
                            border-style:solid; 
                            border-radius: 30px"
                            >
                        <h2 style="font-family: monospace;
                        color: #EAF6FF;">
                        Introduce esta contraseña temporal para acceder a tu perfil</h2>
                        <div>
                        <h3>Contraseña:</h3>  
                        <h3 id="myText" style="
                            margin: auto 300px;
                            border-style:solid;
                            border-color:#ffd900;
                            border-radius: 10px;
                            color:#ffd900;
                            background-color:#494d53;
                            padding: 20px">
                            ${token} 
                            </h3>
                        </div>          
                    </div>
                </div>
`
        })

        const hash = await bcrypt.hash(token, 10)
        await mail.changePassword({ password: hash, email: email })
        res.status(200).json("Contraseña enviada")


    } catch (error) {
        console.log('Error:', error)
    }
}

module.exports = {recoverMail}