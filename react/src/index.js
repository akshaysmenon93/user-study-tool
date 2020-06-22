import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import {BrowserRouter as Router} from 'react-router-dom'
import configureStore from "./redux/configureStore"
import {Provider as ReduxProvider} from "react-redux"
import "bootstrap/dist/css/bootstrap.min.css"

const store = configureStore()

ReactDOM.render(
    <ReduxProvider store={store}>
        <Router>
            <App />
        </Router>
    </ReduxProvider>,
    document.getElementById( 'root' )
)



