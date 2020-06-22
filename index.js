const express = require( 'express' )
const app = express()
const path = require( 'path' )
const port = process.env.PORT || 3000
const cors = require( 'cors' )
const bodyParser = require( 'body-parser' )
const routes = require( './routes' )
const swaggerUI = require( 'swagger-ui-express' )
const swaggerSpec = require( './doc/swagger' )

// Middleware
app.use( cors() )
app.use( bodyParser.json() )

// Static Routes
app.use( '', express.static( path.join( __dirname, 'react/build' ) ) )
app.get( '/', ( req, res ) => res.sendFile( path.join( __dirname, 'react/build/index.html' ) ) )

// API Routes
const apiRouter = express.Router()
app.use( '/api/v1', apiRouter )

apiRouter.get( '/', ( req, res ) => res.json( {apiVersion: "1.0"} ) )
apiRouter.use( '/tasks', routes.task )
apiRouter.use( '/experiments', routes.experiment )
apiRouter.use( '/users', routes.user )
apiRouter.use( '/login', routes.login)
apiRouter.use( '/register', routes.register)
apiRouter.use( '/logout', routes.logout)
apiRouter.use( '/docs', swaggerUI.serve )
apiRouter.get( '/docs', swaggerUI.setup( swaggerSpec ) )

// Error handler
app.use( function ( error, req, res, next ) {
  if ( error.status ) {
    return res.sendStatus( error.status )
  }

  next()
} )

// Static Routes
app.use( express.static( path.join( __dirname, 'react', 'build' ) ) )
app.get( '*', ( req, res ) => res.sendFile( path.join( __dirname, 'react', 'build', 'index.html' ) ) )


// Listen
app.listen( port, () => console.log( `App is listening on port ${ port }!` ) )