const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getByWishlist = async function (req, res) {
    try {
        const positions = await Position.find({
            wunschliste: req.params.wunschlisteId,
            user: req.user.id
        })
        res.status(200).json(positions)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.createPosition = async function (req, res) {
    try {
        const position = await new Position({
            title: req.body.title,
            link: req.body.link ? req.body.link : '',
            cost: req.body.cost ? req.body.cost : '',
            imageSrc: req.file ? req.file.path : '',
            wunschliste: req.body.wunschliste,
            user: req.user.id
        }).save()
        res.status(200).json(position)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.updatePosition = async function (req, res) {
    try {
        const position = await Position.findByIdAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
            )
            res.status(200).json(position)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.removePosition = async function (req, res) {
    try {
        await Position.remove({_id: req.params.id})
        res.status(200).json({message: 'Position wurde gelöscht'})
    } catch (e) {
        errorHandler(res, e)
    }
}
