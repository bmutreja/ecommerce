const ErrorHandler = require('../utils/errorHandler');


module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal server error';


    if(process.env.NODE_MODE === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errorMessage: err.message,
            stack: err.stack
        });
    }

    if(process.env.NODE_MODE === 'PRODUCTION'){
        let error = {...err};
        error.message = err.message;
        
        //wrong mongoose object id errorMessage 
        if(err.name === "CastError"){
            const message = `Resource Not Found , Invalid : ${err.path}`;
            error = new ErrorHandler(message,400);
        }

        //Handeling mongoose validation
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message,400);
        }


        res.status(error.statusCode).json({
            success: false,
            error: error.message || 'Internal server error'
        });
    }

    
}