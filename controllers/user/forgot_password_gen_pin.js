const _ = require('lodash');
const nodemailer = require('nodemailer');
const {RENDER_BAD_REQUEST} = require('../common/utils');
const {User} = require('../../models/user');

const forgot_password_gen_pin = async (req, res) => {

    try {
        const body = _.pick(req.body, ['email']);
        const user = await User.findUserByEmail(body.email);
        var userEmail = 'hiddenlogics55@gmail.com';
        var userPassword = 'hidden8855';

        if (!user) {
            res.status(400).json({
                code: 400,
                message: 'User you are trying to reach not exist in the system'
            });
        }

        else {

            const value = Math.floor(Math.random() * (9999-1) + 1)

            var transporter = nodemailer.createTransport(`smtps://${userEmail}:${userPassword}@smtp.gmail.com`);

            var mailOptions = {
                from: userEmail,    // sender address
                to: body.email, // list of receivers
                subject: 'Password Reset Code', // Subject line
                text: "" + value       // plaintext body
            };
            
            // send mail with defined transport object
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });

            user.reset_password_code = value;
            await user.save();
            res.json({
                code: 200,
                message: 'reset password code has been emailed to you via email'
            });

        }

    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }

};

module.exports = forgot_password_gen_pin;
