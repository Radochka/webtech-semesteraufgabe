const express = require('express')
const controller = require('../contollers/wishlist')
const passport = require('passport')
const upload = require('../middleware/upload')
const router = express.Router()

router.get('/',
    passport.authenticate('jwt', {session: false}),
    controller.getLists)
router.get('/:id',
    passport.authenticate('jwt', {session: false}),
    controller.getList)
router.post('/',
    passport.authenticate('jwt', {session: false}),
    upload.single('image'), controller.createList)
router.put('/:id',
    passport.authenticate('jwt', {session: false}),
    upload.single('image'), controller.updateList)
router.delete('/:id',
    passport.authenticate('jwt', {session: false}),
    controller.removeList)


module.exports = router