const User = require('../model/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsync = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmails');
const crypto = require('crypto');


//Register User => /api/v1/register
exports.registerUser = catchAsync(async (req,res,next)=>{

    const {name, email , password} = req.body;

    const user = await User.create({

        name,
        email,
        password,
        avatar: {
            public_id: 'asdasdasdasdasdasd',
            url: 'https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png'
        }

    });

    // const token = user.getJWtToken();

    // res.status(201).json({
    //     success: true,
    //     token
    // })

    sendToken(user, 200, res);

});

// Login => /api/v1/login

exports.loginUser = catchAsync(async (req,res,next)=>{

    const {email,password }= req.body;
    
    if(!email || !password){
        return next(new ErrorHandler('Please Enter Email And Password', 400))
    }

    //finding user in database
    const user = await User.findOne({email}).select('+password');

    if(!user){ 
        return next(new ErrorHandler('Invelid Email and Password',401));
    }

    //checks if password is correct or not
    const isPasswordMatch = await user.comparePassword(password);

    if(!isPasswordMatch){
        return next(new ErrorHandler('Invelid Email and Password',401));
    }

    sendToken(user, 200, res);

});

//get currunt loggedin user /api/v1/me
exports.getUserProfile = catchAsync(async (req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    });
});

//update password =>  /api/v1/password/update  
exports.updatePassword = catchAsync(async (req,res,next)=>{
    const user = await User.findById(req.user.id).select('+password');

    //check previous password
    const isMatched = await user.comparePassword(req.body.oldPassword);

    if(!isMatched){
        return next(new ErrorHandler('old password is incorrect..',400));
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res);


    res.status(200).json({
        success: true,
        user
    });
});

//update profile => /api/v1/profile/update
exports.updateProfile = catchAsync(async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email
    }

    //update avatar : todo

    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true
    })
});

//Logout => /api/v1/logout
exports.logout = catchAsync(async(req,res,next)=>{
    res.cookie('token',null, {
         expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })

});


//forgetpassword => /api/v1/password/forget/
exports.forgotPassword = catchAsync(async(req,res,next)=>{
      
    const user = await User.findOne({email: req.body.email});
    
    if(!user){
        return next(new ErrorHandler('User Not Found with this email',404));
    
      }
    
      //get reset tokeen
      const resetToken = user.getResetPasswordToken();

      await user.save({validateBeforeSave: false});

      //create password rest Url
      const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

      const message = `Your password reset token as follow:\n\n${resetUrl}\n\nif you have not  requested  this email then ignore it`;

      try {
          
        await sendEmail({
            email: user.email,
            subject: "Ecommerce password  recovery",
            message
        })

        res.status(200).json({
            status: true,
            message:`Email sent to: ${user.email}`    
        })

      } catch (error) {
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;
                
          await user.save({validateBeforeSave: false});

          return next(new ErrorHandler(error.message,500))
      }
});

// it is not working pending
exports.resetPassword = catchAsync(async(req,res,next)=>{

    //Hash URL token
    const resetPasswordToken  =  crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now() }
    });

    console.log(user);
    if(!user){
        return next(new ErrorHandler('password reset token is invelid or has been expired', 400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password dose not match',400));
    }

    // setup a new password
    user.password  = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

});

//get all users => /api/v1/admin/users  
exports.allUsers = catchAsync(async(req,res,next)=>{
    const user = await User.find();

    res.status(200).json({
        success: true,
        user
    })
});


//update profile by admin => /api/v1/admin/users/:id
exports.updateUserByAdmin = catchAsync(async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }

    //update avatar : todo

    const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true
    })
});


//delete user by admin => /api/v1/admin/users/:id
exports.deleteUser = catchAsync(async (req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User dose not found with id: ${req.params.id}`))
    }

    //remove avatar from cloudnary pending

    await user.remove();

    res.status(200).json({
        success: true,
        user
    });
});