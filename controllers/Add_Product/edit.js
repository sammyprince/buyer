const _ = require('lodash');
const {RENDER_BAD_REQUEST} = require('../common/utils');
const {Add_Product} = require('../../models/add_product');

const edit_article = async (req, res) => {

    try {

        let product_id = req.query._id;
        const body = _.pick(req.body, [ 'name', 'currency','amount' ]);

        if(req.user.merchant == true){

            const edited_product = await Add_Product.editProduct(product_id, body);

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
