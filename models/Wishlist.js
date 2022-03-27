const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wishlistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    datum: {
        type: String,
        default: ''
    },
    imageSrc: {
        type: String,
        default: ''
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    /* kind: {
        type: String,
        required: true
    } */
})

module.exports = mongoose.model('wunschlisten', wishlistSchema)