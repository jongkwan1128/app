const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// UserSchema.plugin(autoIncrement.plugin, {model: 'User', field: 'id', startAt: 1});
module.exports = mongoose.model('User', UserSchema);