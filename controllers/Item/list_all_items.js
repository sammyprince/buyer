const _ = require('lodash');
const {RENDER_BAD_REQUEST} = require('../common/utils');
const {items} = require('../../models/items');

const list = async (req, res) => {
    try {
        const _items = await items.getAllList();

        if (!_items) {
            res.status(400).json({ message : "not found"});
        }

        res.json({
            code: 200,
            items: _items
        });
    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = list;