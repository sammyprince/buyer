const _ = require('lodash');
const {USER_NOT_FOUND} = require('../common/error_codes');
const {RENDER_BAD_REQUEST} = require('../common/utils');
const {User} = require('../../models/user');
const {invoices} = require('../../models/invoices');
var QRCode = require('qrcode')

const article = async (req, res) => {
    try {
        let resp;
        const token = req.header('x-sh-auth');
        const user = await User.findByToken(token);
        if (!user) {
            res.status(400).json(USER_NOT_FOUND);
        }

        console.log('app reached');
        

            const body = _.pick(req.body, ['invoice_no' , 'discount' ,'cus_phone','cus_address','cus_email','payment_type','vat', 'date' , 'total' , 'items' , "merchant_id" ]);

            const invoice = new invoices({

                user : user._id,
                merchant_id: body.merchant_id,
                invoice_no: body.invoice_no,
                discount: body.discount,
                date : Date.now(),
                cus_phone: body.cus_phone,
                cus_address : body.cus_address,
                cus_email: body.cus_email,
                payment_type : body.payment_type,
                vat : body.vat,
                total : body.total,
                items : body.items
            });

            await invoice.save();

            let qr_code

            QRCode.toString(JSON.stringify(invoice), function (err, url) {
                qr_code = url;
              })
            console.log(qr_code)

         
            resp = {
                code: 200,
                message : 'Successfully Added',
                invoice: invoice,
                data_url : qr_code
            };

        res.json(resp);
    }

    catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = article;