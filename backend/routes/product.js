const express = require('express');
const router = express.Router();


const { getProducts,newProduct, getSingleProduct,updateProduct, deleteProduct 
, createProductReview, getProductReviews,deleteReviews
} = require('../controllers/productController');

const { isAuthenticated, authrizedRoles } = require('../middleware/auth');

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/admin/product/new').post(isAuthenticated,authrizedRoles('admin'),newProduct);
router.route('/admin/product/:id').put(isAuthenticated,authrizedRoles('admin'),updateProduct);
router.route('/admin/product/:id').delete(isAuthenticated,authrizedRoles('admin'),deleteProduct);

router.route('/review').put(isAuthenticated,createProductReview);
router.route('/reviews').get(isAuthenticated,getProductReviews);
router.route('/review').delete(isAuthenticated,deleteReviews);
module.exports = router;