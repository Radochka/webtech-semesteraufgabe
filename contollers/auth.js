const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')

module.exports.login = async function (req, res) {

    const candidate = await User.findOne({email: req.body.email})
    if(candidate) {
        //candidate gefunden
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if(passwordResult){
            //Generation Token
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id,
                role: candidate.role
            }, keys.jwt, {expiresIn: 60*60*3})
            res.status(200).json({
                data: {
                    id: candidate._id,
                    email: candidate.email,
                    role: candidate.role
                },
                token: `Bearer ${token}`
            })
        }else{
            res.status(401).json({
                message: 'Password stimmt nicht überein'
            })
        }

    }else{
        //candidate nicht gefunden
        res.status(404).json({
            message: 'User mit dieser Email nicht gefunden.'
        })
    }
}

module.exports.register = async function (req, res) {
    //email password role user
    const candidate = await User.findOne({email: req.body.email})
    if(candidate) {
        //candidate existiert gerade
        res.status(409).json({
            message: 'Diese Email existiert bereits. Bitte wähle eine andere Email'
        })
    }else{
        //candidate nicht gefunden
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
            role: req.body.role ? req.body.role : '',
            geburtsdatum: req.body.geburtsdatum
        })
        try {
            await user.save()
            res.status(201).json(user)
        }catch (e){
            //Fehler bearbeiten
        }

    }


}