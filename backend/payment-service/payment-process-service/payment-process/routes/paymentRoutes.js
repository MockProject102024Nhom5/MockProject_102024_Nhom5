'use strict';

const express = require('express');
const paymentController = require('../controller/paymentController');
const router = express.Router();

const{addPayment, getPayment, getPayments, updatePayment, deletePayment} = paymentController;

router.get('/payments', getPayments)
router.get('/payment/:id',getPayment)
router.post('/payment', addPayment)
router.put('payment/:id/update',updatePayment)
router.delete('/payment/:id/delete', deletePayment)

module.exports = {
    routes: router
}
