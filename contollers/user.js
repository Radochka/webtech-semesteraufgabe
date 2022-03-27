const User = require('../models/User')


module.exports.getUser = function (req, res) {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json({ user })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.updateUser = function (req, res) {
    const update = {
        name: req.body.name,
        geburtsdatum: req.body.name,
    }
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: update },
            { new: true })
        res.status(200).json({ user })
    } catch (e) {
        errorHandler(res, e)
    }

}


module.exports.getUsers = function (req, res) {
    res.status(200).json({
        register: 'from controller'
    })
}

module.exports.registerChild = function (req, res) {
    res.status(200).json({
        register: 'from controller'
    })
}

module.exports.removeUser = function (req, res) {
    res.status(200).json({
        register: 'from controller'
    })
}
