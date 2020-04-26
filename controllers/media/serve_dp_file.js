const {USER_DP_PATH} = require('../common/constants');
const {RENDER_BAD_REQUEST} = require('../common/utils');

const serve_large_image = async (req, res) => {
    try {
        const file_name = req.params.file_name;
        const full_path = USER_DP_PATH + '/' + file_name;
        res.sendFile(full_path);
    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = serve_large_image;