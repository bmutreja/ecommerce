const app = require('./app');
const connectDatabase = require('./config/database');


const dotenv =  require('dotenv');
const { connect } = require('./app');
 
// setting up config file
dotenv.config({path : 'backend/config/config.env'});


// connecting to Database
connectDatabase();



const server = app.listen(process.env.PORT,()=>{
    console.log(`server start with port : ${process.env.PORT} in ${process.env.NODE_MODE} mode.`);
});

//unhandledRejection
process.on('unhandledRejection', err =>{
    console.log(`Error ${err.message}`);
    console.log('shutting down the server deu to unhandledRejection');
    server.close(()=>{
        process.exit(1);
    });
});

//uncaughtException 
process.on('uncaughtException', err=>{
    console.log(`Error ${err.message}`);
    console.log('shutting down the server deu to uncaughtException');
    server.close(()=>{
        process.exit(1);
    });
})

