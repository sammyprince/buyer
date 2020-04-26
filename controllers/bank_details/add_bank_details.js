// const _ = require('lodash');
// const {USER_NOT_FOUND} = require('../common/error_codes');
// const {RENDER_BAD_REQUEST} = require('../common/utils');
// const {COMPANY_NOT_FOUND} = require('../common/error_codes');
// const {User} = require('../../models/user');
// const {Bank_Details} = require('../../models/bank_details');



// const bank_detail = async (req, res) => {
//     try {
//         let resp;
//         const token = req.header('x-sh-auth');
//         const user = await User.findByToken(token);
//         if (!user) {
//             res.status(400).json(USER_NOT_FOUND);
//         }

//         console.log("Awais")
//         if(user.merchant == true){


//             const body = _.pick(req.body, ['bank_details']);

//             const bank_detail = new Bank_Details({
//                 user: user._id,
//                 bank_details: body.bank_details,
               
//             });

//             await bank_detail.save();

//             resp = {
//                 code: 200,
//                 message : 'Successfully Added',
//                 bank_details: bank_detail
//             };

//        }

//         else {
//             resp = {
//                 code: 400,
//                 message : 'You are not an Merchant'
//             };
//         }

//         res.json(resp);
//     }

//     catch (e) {
//         RENDER_BAD_REQUEST(res, e);
//     }
// };

// module.exports = bank_detail;


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

        if(_updated_user.merchant == true){
            updated_user = _updated_user.adminJson();
        }

       else if(_updated_user.buyer == true){
            updated_user = _updated_user.adminJson();
        }

        res.json(updated_user);

    }
    catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }

};

module.exports = profile_update;
