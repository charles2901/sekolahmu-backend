const authorization = (req, res, next) => {
    if(req.userData.role !== 'admin'){
        next({name: "AUTHORIZATION_FAILED"})
    } else {
        next();
    }
}

module.exports = {
    authorization
}