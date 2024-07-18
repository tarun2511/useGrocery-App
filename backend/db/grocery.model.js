const mongoose = require('mongoose');

const GrocerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a product name"]
    },
    description: {
        type: String
    },
    sellingPrice: {
        type: Number,
        required: ["true", "Please provide product price"]
    },
    ogPrice: {
        type: Number,
        required: ["true", "Please provide origial price"]
    },
    rating: {
        type: Number
    },

    image: {
        data: String,
        contentType: String,
        required: ["true", "Please provide a product image"]
    },
    category: {
        type: String,
    },
    brand: {
        type: String ,
        default: "Not available"
    },
    unit: {
        type: String,
        default: "Not available"
    },
    shelfLife: {
        type: String,
        default: "Not available"

    }
})

const Grocery = mongoose.model("Grocery", GrocerySchema);
module.exports= Grocery;