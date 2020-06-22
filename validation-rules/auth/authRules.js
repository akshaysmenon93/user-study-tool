const { checkSchema } = require('express-validator')

module.exports = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Email must be in valid format"
    },
    notEmpty: {
      errorMessage: "Email must be not empty"
    }
  },
  password: {
    in: ["body"],
    isAlphanumeric: {
      errorMessage: "Password must be string"
    },
    notEmpty: {
      errorMessage: "Password must be not empty"
    }
  },

})