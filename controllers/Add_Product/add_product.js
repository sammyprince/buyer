const _ = require('lodash');
const {USER_NOT_FOUND} = require('../common/error_codes');
const {RENDER_BAD_REQUEST} = require('../common/utils');
const {User} = require('../../models/user');
const {Add_Product} = require('../../models/add_product');

const addproduct = async (req, res) => {
    try {
        let resp;
        const token = req.header('x-sh-auth');
        const user = await User.findByToken(token);
        if (!user) {
            res.status(400).json(USER_NOT_FOUND);
        }

        if(user.merchant == true){

            const body = _.pick(req.body, ['name', 'currency','amount' ]);

            const product = new Add_Product({
                name: body.name,
                currency : body.currency,
                amount : body.amount,
                date : Date.now(),
            });

            await product.save();     

            resp = {
                code: 200,
                message : 'Successfully Added',
                cus_name : user.name,
                items: product
            };

        }

        else {
            resp = {
                code: 400,
                message : 'You are not an merchant'
            };
        }

        res.json(resp);
    }

    catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = addproduct;