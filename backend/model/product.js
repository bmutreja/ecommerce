const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

title: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true,
    maxlength: [100, 'Product name can not exceed 100 characters']
},

price: {
    type: Number,
    required: [true, 'Please enter product price'],
    maxlength: [5, 'Product price can not exceed 5 characters'],
    default: 0.0
},
description: {
    type: String,
    required: [true, 'Please enter product discription']
},
ratings: {
    type: Number,
    default: 0.0
},
images: [{
    public_id : {
        type: String,
        required: true,

    },
    url : {
        type: String,
        required: true,

    }
}],
category: {
    type: String,
    required: [true, 'Please select category fro this product'],
    enum:{
        values: [
            'Electronics',
            'Food',
            'Accsesory',
            'Sports',
            'Laptop',
            'HeadPhones',
            'Books',
            'cloths',
            'Shoes',
            'Beauty/Health',
            'Outdoors',
            'Home'
        ],
        message: "please select the correct category for this product"
    }
},

seller: {
        type: String,
        required: [true, "Please Enter Product Seller"]
},
 stock: {
            type: Number,
            required: [true, 'Please enter product Stock'],
            maxlength: [5, 'Product can not exceed 5 product'],
            default: 0
},
numOfReviews: {
        type: Number,
        default: 0
},
reviews: [{
        
        name: {
            type: String,
            required: true
         },
        rating: {
            type: Number,
            required: true
        },
        comment : {
            type: String,
            required: true
        },
        user:{
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        }
}],
user:{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
},
createdAt: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model('product',productSchema);