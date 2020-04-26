const express = require('express');
const router = express.Router();
const {register_route} = require('../utils/routes');


const upload_dp = require('../controllers/media/upload_dp');
const serve_dp_file = require('../controllers/media/serve_dp_file');

register_route({
    router,
    auth_required: false,
    route: '/dp/serve/:file_name',
    get_method: serve_dp_file
});


register_route({
    router,
    auth_required: false,
    route: '/upload_dp',
    post_method: upload_dp
});


module.exports = router;