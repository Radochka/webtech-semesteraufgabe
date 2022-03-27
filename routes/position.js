const express = require('express')
const controller = require('../contollers/position')
const passport = require('passport')
const router = express.Router()

router.get('/:wunschlisteId',
    passport.authenticate('jwt', { session: false }),
    controller.getByWishlist)
router.post('/',
    passport.authenticate('jwt', { session: false }),
    controller.createPosition)
router.put('/:id',
    passport.authenticate('jwt', { session: false }),
    controller.updatePosition)
router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    controller.removePosition)


module.exports = router