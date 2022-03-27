const express = require('express')
const controller = require('../contollers/user')
const router = express.Router()

router.get('/', controller.getUsers)
router.get('/:id', controller.getUser)
router.post('/register-child', controller.registerChild)
router.put('/:id', controller.updateUser)
router.delete('/:id', controller.removeUser)


module.exports = router