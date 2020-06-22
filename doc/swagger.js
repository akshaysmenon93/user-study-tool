const swagger = require('swagger-jsdoc')
const path = require('path')

const options = {
  definition: {
    openapi: '3.0.3', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'CS615 Group 3 Project API', // Title (required)
      version: '1.0.0', // Version (required)
    },
    servers: [
      {
        url: '/api/v1'
      }
    ]
  },
  // Path to the API docs
  apis: [path.join(__dirname, 'components.yaml'), path.join(__dirname, '../routes/*.js')],
}

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
module.exports = swagger(options)