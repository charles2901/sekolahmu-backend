const jwt = require('jsonwebtoken')
const secretKey = 'sekolahmu-test'

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role, name: user.name },
        secretKey
    )
}
    
const verifyToken = (token) => {
    return jwt.verify(token, secretKey)
}

module.exports = {
    generateToken,
    verifyToken
}
