const express = require('express');
const router = express.Router();
const User = require("../db/user.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


router.post("/register", async (req, res) => {
    try{
        const {firstName, lastName, email, password} = req.body.data;
        if(!(firstName && lastName && email && password)){
            res.status(400).json({msg: "Missing input fields"});
        }

        const existingUser = await User.findOne({email});
        
        if(existingUser){
            res.status(400).json({msg: "User already exists"});
        }
        
        const encPass = await bcrypt.hash(password, 10);
        const newUser = await new User({
            firstName,
            lastName,
            email,
            password: encPass
        })
        await newUser.save();

        const token = await jwt.sign({
            id: newUser._id,
            email
        }, "shhhh", 
        {expiresIn: "2h"});
         newUser.token = token;
         newUser.password = undefined;
        res.status(201).json(newUser);
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router;