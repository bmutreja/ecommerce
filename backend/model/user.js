const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        require: [true, 'Please enter your name'],
        maxlength : [30,'Your name can not exceed 30 charaters']
    },
    email: {
        type: String,
        require: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        require: [true, 'Please enter your password'],
        minlength : [6,'Your password must be longer then 6 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            require: true    
        },
        url: {
            type: String,
            require: true    
        }
        
    },
    role:{
        type: String,
        default: 'user'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
        

});

    // encrypt password
        userSchema.pre('save',async function(next){
            if(!this.isModified('password')){
                next();
            }

            this.password = await bcrypt.hash(this.password, 10);
        });

        //sign jwt token
        userSchema.methods.getJwtToken = function(){
            return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_TIME
            });
        }

        //compare user password
        userSchema.methods.comparePassword = async function(enterPassword){
            return await bcrypt.compare(enterPassword, this.password); 
        }

        //Generate password reset token
        userSchema.methods.getResetPasswordToken = function(){
            //Generate a token
            
            const resetToken = crypto.randomBytes(20).toString('hex');
            // has and set  to resetpasswordtoken
            this.resetpasswordtoken = crypto.createHash('sha256').update(resetToken).digest('hex');

            //set token expire time
            this.resetPasswordExpire = Date.now() + 30 * 60 *1000;

            return resetToken;
        }



module.exports = mongoose.model('User',userSchema);