const _ = require('lodash');
const {RENDER_BAD_REQUEST} = require('../common/utils');
const {User} = require('../../models/user');

const get = async (req, res) => {
    try {
        const users = await User.findAllBuyer();

        if (!users) {
            res.status(400).json({message : "no user found"});
        }

        else {

            res.json({
                code: 200,
                buyers: users,
            });
        }

    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = get;