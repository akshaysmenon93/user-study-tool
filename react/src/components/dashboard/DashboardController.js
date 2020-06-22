import React from 'react'
import Header from '../layout/Header'
import Menu from "../layout/Menu"
import {makeStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import HomeController from "../home/HomeController"
import ExperimentController from '../experiment/ExperimentController'
import TaskController from '../task/TaskController'
import ManageTask from '../task/ManageTask'
import {useRouteMatch, Switch, Route, useHistory} from "react-router-dom"
import Toolbar from "@material-ui/core/Toolbar"
import Paper from "@material-ui/core/Paper"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ManageExperiment from '../experiment/ManageExperiment'
import {logout} from '../../redux/actions/authActions'
import {connect} from 'react-redux'

const useStyles = makeStyles( ( theme ) => ( {
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing( 3 ),
  },
} ) )

function Dashboard ( props ) {
  const classes = useStyles()
  let {path} = useRouteMatch()
  let history = useHistory()

  function handleLogout () {
    props.logout( history )
  }

  return (

    <div className={classes.root}>

      <CssBaseline />
      <Header onLogout={handleLogout} />
      <Menu />
      <main className={classes.content}>

        <Toolbar />

        <Paper elevation={3} className={"p-5"}>

          <Switch>

            <Route exact path={path} component={HomeController} />

            <Route path={`${ path }/home`} component={HomeController} />

            <Route path={`${ path }/experiments/experiment/:id`} component={ManageExperiment} />

            <Route path={`${ path }/experiments/experiment`} component={ManageExperiment} />

            <Route path={`${ path }/experiments`} component={ExperimentController} />

            <Route path={`${ path }/tasks/task/:id`} component={ManageTask} />

            <Route path={`${ path }/tasks/task`} component={ManageTask} />

            <Route exact path={`${ path }/tasks`} component={TaskController} />

          </Switch>

        </Paper>

      </main>
      <ToastContainer autoClose={4000} hideProgressBar />
    </div>

  )
}

function mapStateToProps ( state, ownProps ) {
  return {
    auth: state.auth
  }
}

export default connect( mapStateToProps, {logout} )( Dashboard )