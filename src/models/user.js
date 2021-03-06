const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: {type:String},
    lastName: {type:String},
    email: {type:String},
    password: {type:String}
}, {
    collection: 'users'
});
module.exports = mongoose.model('User', User);