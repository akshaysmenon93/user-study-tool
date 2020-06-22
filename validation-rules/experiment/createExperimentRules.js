const { checkSchema } = require('express-validator')

module.exports = checkSchema({
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
  tasks:{
    in: ["body"],
    isArray: {
      errorMessage: "Tasks must be an array of tasks"
    },
    optional:true
  }

})