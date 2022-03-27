const mongoose = require('mongoose')
const Schema = mongoose.Schema

const positionSchema = new Schema({
    imageSrc: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        default: ''
    },
    cost: {
        type: Number,
        default: ''
    },
    wunschliste: {
        ref: 'wunschlisten',
        type: Schema.Types.ObjectId
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('positions', positionSchema)