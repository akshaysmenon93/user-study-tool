const { checkSchema } = require('express-validator')

module.exports = checkSchema({
  fullName: {
    in: ["body"],
    isString: {
      errorMessage: "Full Name must be string"
    },
    notEmpty: {
      errorMessage: "Full Name must be not empty"
    }
  },
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Email must be valid"
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