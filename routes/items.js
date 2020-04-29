const express = require('express');
const router = express.Router();
const {register_route} = require('../utils/routes');


//////////////////////////////////////////////////////////////////////
///////////////// Items ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

const add_item = require('../controllers/Item/add_item');
const get_items = require('../controllers/Item/get');
const list_all_items = require('../controllers/Item/list_all_items');
const edit_an_item = require('../controllers/Item/edit_an_item');
const delete_items = require('../controllers/Item/delete');
const list_all_items_by_user = require('../controllers/Item/list_all_items_by_user');


register_route({
    router,
    route: '/merchants/id/sale',
    post_method: add_item
});


register_route({
    router,
    route: '/get_items',
    get_method: get_items
});


register_route({
    router,
    route: '/list_all_items',
    get_method: list_all_items
});

register_route({
    router,
    route: '/merchants/id/sales',
    get_method: list_all_items_by_user
});


register_route({
    router,
    route: '/edit_an_item',
    post_method: edit_an_item
});


register_route({
    router,
    route: '/delete_items',
    get_method: delete_items
});




module.exports = router;