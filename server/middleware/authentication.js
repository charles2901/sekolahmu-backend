const { verifyToken } = require('../helpers/loginToken')

const authentication = (req, res, next) => {
    const { access_token } = req.headers

    if (!access_token) {
		next({name: 'TOKEN_NOT_FOUND'})
	}

	try {

		const decoded = verifyToken(access_token);
		req.userData = decoded;
		next();
	} catch (err) {
		next({name: 'AUTHENTICATION_FAILED'})
	}
}

module.exports = {
    authentication
}