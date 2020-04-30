const express = require('express');
const router = express.Router();
const {register_route} = require('../utils/routes');

const get_delete_account = require('../controllers/user/deleteAccount');
const post_register = require('../controllers/user/register');
const register_buyer = require('../controllers/user/register_buyer');
const post_login = require('../controllers/user/login');
// const get_profile = require('../controllers/user/profile');
const get_profile = require('../controllers/user/get_user_profile');
const get_logout = require('../controllers/user/logout');
const get_logout_all_devices = require('../controllers/user/logout_all_devices');
const post_confirm_register_pin = require('../controllers/user/confirm_register_pin');
const get_confirm_register_uri = require('../controllers/user/confirm_register_uri');
const post_profile_update = require('../controllers/user/profile_update');
const post_forgot_password_gen_pin =  require('../controllers/user/forgot_password_gen_pin');
const post_reset_password_pin = require('../controllers/user/reset_password_pin');
const confirmpass = require('../controllers/user/confirmpass');
const post_reset_password = require('../controllers/user/reset_password');
const update_token = require('../controllers/user/update_token');
const get_all_merchants = require('../controllers/user/get_all_merchants');
const get_all_buyer = require('../controllers/user/get_all_buyer');


register_route({
    router,
    auth_required: false,
    route: '/create',
    post_method: post_register
});

register_route({
    router,
    auth_required: false,
    route: '/create/buyer',
    post_method: register_buyer
});

register_route({
    router,
    auth_required: false,
    route: '/login',
    post_method: post_login
});


register_route({
    router,
    auth_required: false,
    route: '/forgot-password',
    post_method: post_forgot_password_gen_pin
});

register_route({
    router,
    auth_required: false,
    route: '/reset-password',
    post_method: post_reset_password_pin
});

register_route({
    router,
    route: '/confirm-password',
    post_method: confirmpass
});


register_route({
    router,
    route: '/update/token',
    auth_required:true,
    get_method: update_token
});


register_route({
    router,
    route: '/merchants/id/profile',
    get_method: get_profile
});

register_route({
    router,
    route: '/buyers/id/profile',
    get_method: get_profile
});

register_route({
    router,
    route: '/merchants',
    get_method: get_all_merchants
});

register_route({
    router,
    route: '/get_all_buyer',
    get_method: get_all_buyer
});

register_route({
    router,
    route: '/logout',
    get_method: get_logout
});

register_route({
    router,
    route: '/logout_all_devices',
    get_method: get_logout_all_devices
});

register_route({
    router,
    route: '/confirm_register_pin',
    post_method: post_confirm_register_pin
});

register_route({
    router,
    route: '/confirm_register_uri',
    get_method: get_confirm_register_uri
});

register_route({
    router,
    route: '/merchants/id/profile-update',
    post_method: post_profile_update
});

register_route({
    router,
    route: '/buyers/id/profile-update',
    post_method: post_profile_update
});


register_route({
    router,
    route: '/delete_account',
    get_method: get_delete_account
});

module.exports = router;
