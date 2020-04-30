const _ = require('lodash');
const {RENDER_BAD_REQUEST} = require('../common/utils');
const {User} = require('../../models/user');

const profile_update = async (req, res) => {

    let resp = { code: 200 };

    try {
        
        const body = _.pick(req.body, [ "first_name","last_name" , "email" , "ph_no" ]);

        let updated_user = "";


        const _updated_user = await User.updateProfile(req.user._id, body);
        console.log(_updated_user)

        if(_updated_user.account_type == "merchant"){
            updated_user = _updated_user.tomerchantJson();
        }

       else if(_updated_user.account_type == "buyer"){
            updated_user = _updated_user.tobuyerJson();
        }

        res.json(updated_user);

    }
    catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }

};

module.exports = profile_update;
