const Order = require('../model/order');
const Product = require('../model/product');

const ErrorHandler = require('../utils/errorHandler');
const chatchAsyncError = require('../middleware/catchAsyncErrors');



//create new order => /api/v1/order/new
exports.newOrder = chatchAsyncError(async(req,res,next)=>{
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo

     } = req.body;

     const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
     })

     res.send(200).json({
         success: true,
         order
     })
});


//get single order => /api/v1/order/:id
exports.getSingleOrder = chatchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate('user');
    if(!order){
        return next(new ErrorHandler('NO Order found with this id', 404)); 
    }

    res.status(200).json({
        success: true,
        order
    });

});

//get All order => /api/v1/order/
exports.getAllOrder = chatchAsyncError(async(req,res,next)=>{
    const order = await Order.find();
    if(!order){
        return next(new ErrorHandler('NO Order found with this id', 404)); 
    }

    res.status(200).json({
        success: true,
        order
    });

});


//get logged in user order => /api/v1/profile/orders
exports.myOrders = chatchAsyncError(async(req,res,next)=>{
    
    const orders = await Order.find({user: req.user.id});

    res.status(200).json({
        success: true,
        orders
    });

});

//get admin orders => /api/v1/admin/orders
exports.getAdminOrders = chatchAsyncError(async(req,res,next)=>{
    
    const orders = await Order.find();

    let totalAmount =0;
    orders.forEach(order=>{
        totalAmount += order.totalPrice
    })


    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });

});

//get admin orders => /api/v1/admin/orders/:id
exports.updateOrders = chatchAsyncError(async(req,res,next)=>{
    
    const order = await Order.findById(req.params.id);

    console.log(order)

    if(order.OrderStatus === 'Delivered'){
        return next(new ErrorHandler('You have alrady dleiverd this order',400))
    } 

    order.orderItems.forEach(async item => {
        await updateStock(item.product,item.quantity);
    });

    order.OrderStatus = req.body.status;
    order.deleverdAt = Date.now();

    await order.save();

    res.status(200).json({
        success: true,
    });

});

async function updateStock(id,quantity){
    const product =  await Product.findById(id);
    product.stock = product.stock - quantity;
    await product.save({validateBeforeSave: false});
}


//get admin orders => /api/v1/admin/orders/:id
exports.deleteOrders = chatchAsyncError(async(req,res,next)=>{
    
    const order = await Order.findById(req.params.id);

    // console.log(order)

    if(!order){
        return next(new ErrorHandler('this order is not exists',400))
    } 

    await order.remove();

    res.status(200).json({
        success: true,
    });

});