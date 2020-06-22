const { checkSchema } = require('express-validator')

module.exports = checkSchema({
  id: {
    in: ["params"],
    isInt: {
      errorMessage: "ID must be integer"
    }
  },
  title: {
    in: ["body"],
    isString: {
      errorMessage: "Title must be string"
    },
    notEmpty: {
      errorMessage: "Title must be not empty"
    }
  },
  description: {
    in: ["body"],
    isString: {
      errorMessage: "Description must be string"
    },
    notEmpty: {
      errorMessage: "Description must be not empty"
    }
  },
  link: {
    in: ["body"],
    isString: {
      errorMessage: "Link must be string"
    },
    notEmpty: {
      errorMessage: "Link must be not empty"
    }
  },
})