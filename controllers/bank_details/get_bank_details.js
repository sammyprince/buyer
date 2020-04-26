const _ = require('lodash');
const {RENDER_BAD_REQUEST} = require('../common/utils');

const {User} = require('../../models/user');
const get = async (req, res) => {
    try {
        
        const token = req.header('x-sh-auth');
        const user = await User.findByToken(token);
        
        const id = user._id
        console.log(id)
        if (!user) {
            res.status(400).json(USER_NOT_FOUND);
        }
        else {
        //const bank_detail = await Bank_Details.getAllByUser(id);

        // if (!bank_detail) {
        //     res.status(400).json({ message : "not found"});
        // }

        res.json({
            code: 200,
            bank_details: user.bank_details
        });
    }
    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = get;