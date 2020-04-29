const express = require('express');
const router = express.Router();
const {register_route} = require('../utils/routes');

// ************************
// Meta Data
// ************************
const submit_bank_details = require('../controllers/bank_details/add_bank_details');

const get_bank_details = require('../controllers/bank_details/get_bank_details');



register_route({
    router,
    route: '/id/bank-details',
    post_method: submit_bank_details
});

register_route({
    router,
    route: '/id/bill-payment',
    post_method: submit_bank_details
});



register_route({
    router,
    route: '/id/bank-detail',
    get_method: get_bank_details
});

register_route({
    router,
    route: '/id/bill-payments',
    get_method: get_bank_details
});


module.exports = router;