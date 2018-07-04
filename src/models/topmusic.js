const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TopMusic = new Schema({
    idUser: {type:String},
    urlImg: {type:String},
    vote: {type:Number},
    artistName: {type:String},
    musicName:{type:String}
}, {
    collection: 'top_music'
});
module.exports = mongoose.model('TopMusic', TopMusic);