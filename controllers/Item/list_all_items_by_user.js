const _ = require('lodash');
const {RENDER_BAD_REQUEST} = require('../common/utils');
const {items} = require('../../models/items');
const {User} = require('../../models/user');

const list = async (req, res) => {
    try {

        const token = req.header('x-sh-auth');
        const user = await User.findByToken(token);
        
        const id = user._id
        console.log(id)
        if (!user) {
            res.status(400).json(USER_NOT_FOUND);
        }
       else {

        const _items = await items.findByUser(id);

        if (!_items) {
            res.status(400).json({ message : "not found"});
        }

        res.json({
            code: 200,
            items: _items
        });
    }
    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = list;