const _ = require('lodash');
const {USER_NOT_FOUND} = require('../common/error_codes');
const {RENDER_BAD_REQUEST} = require('../common/utils');
const {User} = require('../../models/user');
const {items} = require('../../models/items');

const article = async (req, res) => {
    try {
        let resp;
        const token = req.header('x-sh-auth');
        const user = await User.findByToken(token);
        if (!user) {
            res.status(400).json(USER_NOT_FOUND);
        }

        console.log('app reached');
        if(user.account_type == "merchant"){

            const body = _.pick(req.body, ['name' , 'amount' ,'currency','qty' ]);

            const item = new items({
                
                user: user._id,
                name: body.name,
                amount: body.amount,
                currency: body.currency,
                qty : body.qty

            });

            await item.save();

            resp = {
                code: 200,
                message : 'Successfully Added',
                item: item
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

module.exports = article;