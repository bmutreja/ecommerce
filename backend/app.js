const express = require("express");
const app = express();

const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const cloudinary = require('cloudinary');

// middleware
const errorMiddleware = require('./middleware/error');




app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({extended: true}));

//setting upp cloudinery
// cloudinary.config({

// })


// imports all routes
const products = require('./routes/product');
const user = require('./routes/auth');
const order = require('./routes/order');


app.use('/api/v1',products);
app.use('/api/v1/', user);
app.use('/api/v1/',order);


// middleware handelError
app.use(errorMiddleware);



module.exports = app;