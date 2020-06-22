const { checkSchema } = require('express-validator')

module.exports = checkSchema({
    id: {
        in: ["params"],
        isInt: {
            errorMessage: "ID must be integer"
        },
        notEmpty: {
            errorMessage: "ID must not be empty"
        }
    },
})