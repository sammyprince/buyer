
const _ = require('lodash');
const {RENDER_BAD_REQUEST} = require('../common/utils');
const {User} = require('../../models/user');

const profile_update = async (req, res) => {

    let resp = { code: 200 };

    try {
        
        const body = _.pick(req.body, [ "bank_details" ]);

        let updated_user = "";


        const _updated_user = await User.updateBankDetails(req.user._id, body);
        console.log(_updated_user)

        if(_updated_user.account_type == "merchant"){
            updated_user = _updated_user.adminJson();
        }

       else if(_updated_user.account_type == "buyer"){
            updated_user = _updated_user.adminJson();
        }

        res.json(updated_user);

    }
    catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }

};

module.exports = profile_update;
