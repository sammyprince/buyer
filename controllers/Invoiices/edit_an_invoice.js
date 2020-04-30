const _ = require('lodash');
const {RENDER_BAD_REQUEST} = require('../common/utils');
const {invoices} = require('../../models/invoices');

const edit_article = async (req, res) => {

    try {

        let invoice_id = req.query._id;
        const body = _.pick(req.body, ['invoice_no' , 'discount' ,'cus_phone','cus_address','cus_email','payment_type','vat', 'date' , 'total' , 'items' , "merchant_id" ]);


        if(req.user.account_type == "buyer"){

            const edited_invoice = await invoices.editInvoice(invoice_id, body);

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
