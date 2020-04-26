const _ = require('lodash');
const {User} = require('../../models/user');
const {COMPANY_NOT_FOUND} = require('../common/error_codes');
const {RENDER_BAD_REQUEST, CHECK_REQUEST_PARAMS} = require('../common/utils');


const register = async (req, res) => {
    try {

        const body = _.pick(req.body, ['email', 'password' ,'cpassword', 'name' , 'account_type', 'ph_no' , 'device_token', 'platform' , 'time_zone' , 'device_modal']);
        const params_required = ['email', 'password'];
        const user_type = req.query.user_type;
      
        let responsed_user;

        const req_check = CHECK_REQUEST_PARAMS(body, params_required);
        if (!req_check.all_ok) {
            res.status(400).json({
                code: 400,
                message: 'missing value for :: ' + req_check.missing
            });

        }
        else {

            if(String(user_type) == "merchant"){
                console.log("Awais")
                body.merchant = true;
            }
            else{
                body.merchant = false
            }

            if(String(user_type) == "buyer"){
                body.buyer = true
            }
            else {
                body.buyer = false
            }


            const user = new User({
                email: body.email,
                password: body.password,
                cpassword: body.cpassword,
                name: body.name,
                account_type: body.account_type,
                ph_no : body.ph_no,
                merchant : body.merchant,
                buyer : body.buyer
            });

            await user.save();

           

            if(String(user_type) == "merchant"){
                body.merchant = true
                responsed_user = await user.tomerchantJson();
            }

            if(String(user_type) == "buyer"){
                body.buyer = true
                responsed_user = await user.tobuyerJson();
            }

    
            const token = await user.generateAuthToken({
                device_token: body.device_token,
                platform: body.platform,
                time_zone : body.time_zone,
                device_modal : body.device_modal
            });

            const fresh_user = await User.findById(user._id);
            const length = fresh_user.tokens.length;
            const session_id = fresh_user.tokens[length-1]._id;

            const resp = {
                session_id : session_id,
                user: responsed_user,
                token: token
            };
            res.json(resp);
        }

    } catch (e) {
        //duplicate key
        if ( e.code === 11000 ) {
            res.status(400).json({
                message: 'user with same email already exist'
            });
        }
        else {
            RENDER_BAD_REQUEST(res, e);
        }
    }
};

module.exports = register;