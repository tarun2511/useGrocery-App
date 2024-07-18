const express = require('express');
require('dotenv').config();
const app = express();
const grocery_route = require("./routers/grocery.route");
const user_route = require("./routers/user.route");
const mongoose = require("mongoose");
const multer = require("multer"); 
const router = express.Router();
const port = process.env.PORT;
const cors = require('cors');
const cookieParser = require("cookie-parser");
app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.static("./public"))
app.use(express.json());
app.use(cookieParser()); //to be able to interact with cookies
app.use('/v1/products', grocery_route);
app.use('/v1/users', user_route);
app.get('/', (req, res) => {
    res.send('hello from the backend')
})

const server = () => {
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log('successfully connected to the DB')
        app.listen(port, () => {
            console.log(`server listening on port ${port}`)
        })
    }
    catch(err){
        console.log(err);
    }
}

server();