const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken');
const User = require("../model/user");

// check if user authenticated or not
exports.isAuthenticated = catchAsyncErrors(async(req,res,next)=>{
    
    const { token } = req.cookies;

    console.log(token);

    if(!token){
        return next(new ErrorHandler('Login Please to access this resource',401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next()

});


//Handeling users roles 

exports.authrizedRoles = (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
            return next(
            new ErrorHandler(`Role ${req.user.role} is not allow to access`,403))
        }
        next()
    }
}