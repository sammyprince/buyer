const _ = require('lodash');
const {RENDER_BAD_REQUEST} = require('../common/utils');
const {Add_Product} = require('../../models/add_product');

const list = async (req, res) => {
    try {
        const _products = await Add_Product.getAllList();

        if (!_products) {
            res.status(400).json({ message : "not found"});
        }

        res.json({
            code: 200,
            products: _products
        });
    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = list;
