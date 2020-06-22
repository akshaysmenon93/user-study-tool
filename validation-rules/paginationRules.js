const { checkSchema } = require('express-validator')

module.exports = checkSchema({
  page: {
    in: ["query"],
    customSanitizer: {
      options: (value, { req, location, path }) => {
        let sanitizedValue = 1

        // Check if the value is in the acceptable range
        if (value && parseInt(value) >= 1) {
          sanitizedValue = parseInt(value)
        }

        return sanitizedValue
      }
    }
  },
  perPage: {
    in: ["query"],
    customSanitizer: {
      options: (value, { req, location, path }) => {
        let sanitizedValue = 10

        // Check if the value is in the acceptable range
        if (value && parseInt(value) >= 1 && parseInt(value) <= 100) {
          sanitizedValue = parseInt(value)
        }

        return sanitizedValue
      }
    }
  }
})