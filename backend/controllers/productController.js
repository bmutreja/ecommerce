const Products = require('../model/product');
const ErrorHandler  = require('../utils/errorHandler'); 
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');


// get all products
exports.getProducts = catchAsyncErrors(async(req,res,next)=>{
    
    const resPerPage = 4;

    const productCount = await  Products.countDocuments();

    const apiFeatures = new ApiFeatures(Products.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

    const products = await apiFeatures.query;
   
    
    // const product = await Products.find();
    
    res.status(200).json({ 
        status: true,
        productCount,
        products
    });
})


// get Single Product details => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req,res,next) =>{

    const product = await Products.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        product
    });
})



// Create new Products = /api/v1/admin/product/:id
exports.newProduct = catchAsyncErrors(async (req,res,next)=>{

    req.body.user = req.user.id;

    const product = await Products.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
})

// update product => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async(req,res,next) =>{
    let product = await Products.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    product = await Products.findByIdAndUpdate(req.params.id, req.body , {
        new: true,
        runValidator : true,
        useFindAndModify: false
    });  

    res.status(200).json({
        success: true,
        product
    });

})

// delete products => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async(req,res,next) =>{
    const product = await Products.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message : "product is deleted"
    })

})


// create new review => /api/v1/admin/product/:id
exports.createProductReview = catchAsyncErrors(async(req,res,next) =>{
    
    const {rating, comment, productId} = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Products.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
        );

     if(isReviewed){
         //update review if we find old review
        product.reviews.forEach(review => {
            if(review.user.toString() === req.user._id.toString()){
                review.comment =  comment;
                review.rating =  rating;
            }
        });
     }else{
         // insert new review
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
     }   


     product.ratings = product.reviews.reduce((acc,item) =>
        item.rating + acc, 0) /  product.reviews.length

        await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true
    });

})


//get product reviews =     api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req,res,next)=>{
    const product = await Products.findById(req.query.id);
    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
});

//get product reviews =     api/v1/reviews
exports.deleteReviews = catchAsyncErrors(async (req,res,next)=>{
    // some issue with it work pending

    const product = await Products.findById(req.query.productId);
   
    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        rating,
        numOfReviews
    },{
        new: true,
        runValidator: true,
        useFindAndModify: false
    })

    const ratings = product.reviews.reduce((acc,item) =>
    item.rating + acc, 0) /  product.reviews.length

    res.status(200).json({
        success: true
    })
});