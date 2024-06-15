const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
});

userSchema.methods.encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};


userSchema.methods.comparePassword = async function (password, receivedPassword) {
    return await bcrypt.compare(password, receivedPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;