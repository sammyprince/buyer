const _ = require('lodash');
const {RENDER_BAD_REQUEST} = require('../common/utils');
const {invoices} = require('../../models/invoices');

const list = async (req, res) => {
    try {
        const _invoices = await invoices.getAllList();

        if (!_invoices) {
            res.status(400).json({ message : "not found"});
        }

        res.json({
            code: 200,
            invoices: _invoices
        });
    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = list;