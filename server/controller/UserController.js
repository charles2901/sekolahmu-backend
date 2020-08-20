const { User } = require('../models')
const { generateToken } = require('../helpers/loginToken')
const { comparePassword } = require('../helpers/hashPassword')

class UserController{
    static login(req, res, next){
        const { email, password } = req.body
        User.findOne({ where: { email }})
        .then( user => {
            if(!user || !comparePassword(password, user.password)){
                next({name: 'INVALID_EMAIL_PASSWORD'})
            } else {
                const access_token = generateToken(user)
                res.status(200).json({ access_token })
            }   
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController