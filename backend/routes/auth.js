const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logout , forgotPassword
,resetPassword,
getUserProfile, updatePassword, updateProfile, allUsers, updateUserByAdmin, deleteUser
} = require('../controllers/authController');

const { isAuthenticated,authrizedRoles } = require('../middleware/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/password/update').put(isAuthenticated,updatePassword);

router.route('/profile').get(isAuthenticated,getUserProfile);
router.route('/profile/update').put(isAuthenticated,updateProfile);

router.route('/admin/users').get(isAuthenticated,authrizedRoles('admin'),allUsers);
router.route('/admin/user/:id').put(isAuthenticated,authrizedRoles('admin'),updateUserByAdmin);
router.route('/admin/user/:id').delete(isAuthenticated,authrizedRoles('admin'),deleteUser);


module.exports = router;