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
  status: {
    in: ["body"],
    isInt: {
      errorMessage: "Status must be either 0 or 1"
    },
    notEmpty: {
      errorMessage: "Status must be either 0 or 1"
    },
    optional: true
  },
  tasks:{
    in: ["body"],
    isArray: {
      errorMessage: "Tasks must be an array of tasks"
    },
    optional:true
  },
  deletedTasks:{
    in: ["body"],
    isArray: {
      errorMessage: "This must be an array of to be deleted"
    },
    optional:true
  }
})