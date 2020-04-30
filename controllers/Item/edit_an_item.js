const _ = require('lodash');
const {RENDER_BAD_REQUEST} = require('../common/utils');
const {items} = require('../../models/items');

const edit_article = async (req, res) => {

    try {

        let invoice_id = req.query._id;
        const body = _.pick(req.body, ['name' , 'amount' ,'currency','qty' ]);


        if(req.user.account_type == "merchant"){

            const edited_item = await items.editInvoice(invoice_id, body);

            res.json({
                code: 200,
                message : "edited!"
            });

        }

        else {
            res.json({
                code: 400,
                message : "you are not allowed to edit it!"
            });
        }

    }
    catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }

};

module.exports = edit_article;
