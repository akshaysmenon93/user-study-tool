const router = require('express').Router()
const auth = require('../controllers/authController')
const validateRequest = require('../middlewares/validateRequest')
const authRules = require('../validation-rules/auth/authRules')

router.post('/', validateRequest(authRules), auth.create)
router.get('/', auth.getLogin)

module.exports = router