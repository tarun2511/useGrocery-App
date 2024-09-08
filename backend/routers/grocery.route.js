const express = require('express');
const router = express.Router();
const Grocery = require("../db/grocery.model");
const multer = require("multer");
const path = require("path");

router.get("/", async (req, res) => {
    try{
    const {searchQuery} = req.query;
    const re = new RegExp(searchQuery, "i");
    if(searchQuery){
       const searchedProducts = await Grocery.find({$or: [{name: re}, {category: re}]});
       return res.status(200).json({"products": searchedProducts, "msg": "success"})
    }
    const products = await Grocery.find({});
        return res.status(200).json({"products" : products, "msg": "success"})
    }
    catch(err){
       return res.status(400).json({err})
    }
})

router.get("/product-details/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const resp = await Grocery.findById(`${id}`);
        console.log(resp)
        return res.status(200).json(resp)
    }
    catch(err){
        return res.status(500).json(err)
    }
})

router.get("/getCartProducts/:ids", async(req, res) => {
    try{
        const {ids} = req.params;
        console.log(typeof ids);
        return res.status(200).json({dsad :"dsh"});
    }
    catch(err){
        return res.status(500).json(err);
    }
});

router.delete("/delete-product/:id", async(req, res) => {
    try{
        const {id} = req.params;
        console.log(id)
        await Grocery.findByIdAndDelete(`${id}`)
        return res.status(204).json("product deleted")
    }
    catch(err){
        return res.status(500).json("product not deleted")
    }
})

router.post("/register", async(req, res) => {
    try{
        const {firstName, lastName, email, password} = req.body;
        if(!(firstName && lastName && email && password)){
            res.status(400).send('All fields are mandatory');
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(200).send("User already exists with this email")
        }
        //encrypting pass
        const encPassword = await bcrypt.hash(password, 10);

        //save
        const user = await new User({
            firstName,
            lastName,
            email,
            password: encPassword
        })

        //generate a token for the user and send it
        const token = jwt.sign({
            id: user._id,
            email
        }, 'shhhh' //process.env.jwtsecret
        , {expiresIn: "2h"});
        
        user.token = token;
        user.password = undefined; //since we don't need to send to FE
        //won't make pass undefined in DB just here

        res.status(201).json(user);
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg: "Internal server error"})
    }
})

router.post("/login", async(req, res) => {
    try{
        //get all data fron FE
        const {email, password} = req.body;
        //validation
        if(!(email && password)){
            res.status(400).send("Email or password required")
        }

        //find the user in DB
        const user = await User.findOne({email})

        //check usermatch the password
        if(user && (await bcrypt.compare(password, user.password))){
           //send a token
            const token = jwt.sign({
                id: user._id,

            }, 'shhhh',
            {
                expiresIn: '2h'
            })
            user.token = token;
            user.password = undefined;

            //cookie
            const options = {
                expires: new Date(Date.now() + 3 * 24* 60 *60 *1000),//to smallest unit
                httpOnly: true, //only server can manipulate if this flag is true  
            }
            res.status(200).cookie("token", token, options).json({
                success: true,
                token,
                user
            })
        }

        
    }
    catch(err){
        console.log(err);
    }
})

// router.get("/search", async(req, res) => {
//     try{
//     const {searchQuery} = req.query;
//     const re = new RegExp(searchQuery, "i");
//     const data = await Grocery.findOne(`${searchQuery}`);
//     return res.status(200).json({data});
//     }
//     catch(err){
//         return res.status(500).json(err);
//     }
// })

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})


const upload = multer({storage: Storage}).single("image");

router.post("/addProduct", upload, (req, res, err) => {
    const {name, desc, price,ogPrice, shelf, unit, category} = req.body;
    const filename = req.file? req.file.filename: "null";
    console.log(`${filename} ${req.file}`)
    console.log(req.body)
    const grocery = new Grocery({
        name: name,
        description: desc,
        sellingPrice: price,
        ogPrice: ogPrice,
        category: category,
        image: {
            data: filename,
            contentType: "image/png"
        },
        shelfLife: shelf,
        unit: unit
    })

    grocery.save()
    .then(() => res.status(200).json({msg: "successfully uploaded"}))
    .catch(err => res.status(500).json(err));
})



module.exports = router;