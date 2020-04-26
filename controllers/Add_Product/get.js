const _ = require('lodash');
const {RENDER_BAD_REQUEST} = require('../common/utils');
const {Add_Product} = require('../../models/add_product');

const get = async (req, res) => {
    try {
        const _id = req.query._id;
        const product = await Add_Product.findById(_id);

        if (!product) {
            res.status(400).json({ message : "not found"});
        }

        res.json({
            code: 200,
            product: product
        });
    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = get;