import React from 'react'
import LoginController from './login/LoginController'
import {BrowserRouter, Route, Switch} from "react-router-dom"
import DashboardController from './dashboard/DashboardController'
import PrivateRoute from './common/PrivateRoute'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={LoginController} />
          <PrivateRoute path="/dashboard" component={DashboardController} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
