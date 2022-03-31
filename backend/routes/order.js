const express = require('express');
const router = express.Router();

const {
    newOrder,
    getSingleOrder,
    myOrders,
    getAllOrder,
    getAdminOrders,
    updateOrders,
    deleteOrders
} = require('../controllers/ordersController');

const { isAuthenticated,authrizedRoles } = require('../middleware/auth');


// Order routes


router.route('/order/new').post(isAuthenticated,newOrder);
router.route('/order/:id').get(isAuthenticated,getSingleOrder);

router.route('/profile/orders').get(isAuthenticated,myOrders);

router.route('/order').get(isAuthenticated,getAllOrder);


router.route('/admin/orders').get(isAuthenticated,authrizedRoles('admin'),getAdminOrders);
router.route('/admin/order/:id').put(isAuthenticated,authrizedRoles('admin'),updateOrders);
router.route('/admin/order/:id').delete(isAuthenticated,authrizedRoles('admin'),deleteOrders);

module.exports = router;