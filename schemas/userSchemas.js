
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    password: {
        type: String
    }
})

const User = mongoose.model('users', userSchema);

module.exports = User;

