const bcrypt = require('bcrypt')

const hashPassword = (password) => {
    const saltRounds = 2
    const hash = bcrypt.hashSync(password, saltRounds)
    return hash
}

const comparePassword = (inputPassword, password) => {
    return bcrypt.compareSync(inputPassword, password)
}

module.exports = {
    hashPassword,
    comparePassword
}