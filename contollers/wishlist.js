const Wishlist = require('../models/Wishlist')
const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getLists = async function (req, res) {
    try{
        const wunschlisten = await Wishlist.find({user: req.user.id})
        res.status(200).json(wunschlisten)
    } catch (e){
        errorHandler(res, e)
    }
}

module.exports.getList = async function (req, res) {
try{
    const wunschlisten = await Wishlist.findById(req.params.id)
    res.status(200).json(wunschlisten)
} catch (e){
    errorHandler(res, e)
}
}

module.exports.createList = async function (req, res) {
    const wunschlisten = new Wishlist({
        name: req.body.name,
        datum: req.body.datum,
        user: req.user.id,
        imageSrc: req.file ? req.file.path : ''
    })
    try{
        await  wunschlisten.save()
        res.status(200).json({wunschlisten})
    } catch (e){
        errorHandler(res, e)
    }
}

module.exports.updateList = async function (req, res) {
    const update = {
        name: req.body.name,
        datum: req.body.datum
    }
    if(req.file){
        update.imageSrc = req.file.path
    }
    try{
        const wunschlisten = await Wishlist.findOneAndUpdate(
            {_id: req.params.id},
            {$set: update},
            {new: true})
        res.status(200).json({wunschlisten})
    } catch (e){
        errorHandler(res, e)
    }
}

module.exports.removeList = async function (req, res) {
    try{
        await Wishlist.remove({_id: req.params.id})
        await Position.remove({wunschliste: req.params.id})
        res.status(200).json({
            message: 'Wunschliste wurde gelöscht'
        })
    } catch (e){
        errorHandler(res, e)
    }
}
