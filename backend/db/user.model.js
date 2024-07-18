const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter a first name"]
    },
    lastName:{
        type: String,
        required: [true, "Please enter a last name"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter an email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: null
    }
})


const User = mongoose.model("User", UserSchema);
module.exports = User;

