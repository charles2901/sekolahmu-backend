const router = require('express').Router()
const UserController = require('../controller/UserController')
const ClassController = require('../controller/ClassController')
const { authentication } = require('../middleware/authentication')
const { authorization } = require('../middleware/authorization')

router.post('/login', UserController.login)

router.use(authentication)

router.post('/class', authorization, ClassController.createClass)
router.get('/class/:id', ClassController.findOne)
router.get('/class', ClassController.findAll)
router.put('/checkin/:id', ClassController.checkin)
router.put('/checkout/:id', ClassController.checkout)
module.exports = router