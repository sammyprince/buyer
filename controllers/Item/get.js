const _ = require('lodash');
const {RENDER_BAD_REQUEST} = require('../common/utils');
const {items} = require('../../models/items');

const get = async (req, res) => {
    try {
        const _id = req.query._id;
        const item = await items.findById(_id);

        if (!item) {
            res.status(400).json({ message : "not found"});
        }

        res.json({
            code: 200,
            item: item
        });
    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = get;