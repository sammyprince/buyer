const express = require('express');
const router = express.Router();
const {register_route} = require('../utils/routes');


//////////////////////////////////////////////////////////////////////
///////////////// Product ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

const add_product = require('../controllers/Add_Product/add_product');
const edit_product = require('../controllers/Add_Product/edit');
const delete_product = require('../controllers/Add_Product/delete');
const get_all_products = require('../controllers/Add_Product/get_all_products');
const get_product = require('../controllers/Add_Product/get');


register_route({
    router,
    route: '/add_product',
    post_method: add_product
});


register_route({
    router,
    route: '/get_product',
    get_method: get_product
});


register_route({
    router,
    route: '/get_all_products',
    get_method: get_all_products
});


register_route({
    router,
    route: '/edit_product',
    post_method: edit_product
});


register_route({
    router,
    route: '/delete_product',
    get_method: delete_product
});





module.exports = router;