import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'


function Copyright () {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        User Study Tool
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles( ( theme ) => ( {
  paper: {
    marginTop: theme.spacing( 10 ),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing( 1 ),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing( 1 ),
  },
  submit: {
    margin: theme.spacing( 3, 0, 2 ),
  },
} ) )

const LoginForm = ( props ) => {

  const classes = useStyles()

  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>


        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {/* 
        {props.errors.onSave && (
          <div className="alert alert-danger" role="alert">
            {props.errors.onSave}
          </div>
        )} */}

        <form className={classes.form} noValidate onSubmit={props.onSave}>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={props.user.email}
            onChange={props.onChange}
            error={props.errors.email ? true : false}
            helperText={props.errors.email}
          />


          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={props.user.password}
            onChange={props.onChange}
            error={props.errors.password ? true : false}
            helperText={props.errors.password}
          />

          <Button
            disabled={props.loginAttempt}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {props.loginAttempt ? "Logging in..." : "Log In"}
          </Button>
        </form>

      </div>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )

}


export default LoginForm