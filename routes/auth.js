const router = require('express').Router()
const auth = require('../controllers/authController')
const validateRequest = require('../middlewares/validateRequest')
 const authRules = require('../validation-rules/auth/authRules')
// const updateExperimentRules = require('../validation-rules/auth/updateExperimentRules')
// const paginationRules = require('../validation-rules/paginationRules')

router.post('/', validateRequest(authRules), auth.create)
//router.get('/', validateRequest(authRules), auth.get)
//router.get('/:id', experiments.get)
//router.put('/:id', validateRequest(updateExperimentRules), experiments.update)

module.exports = router