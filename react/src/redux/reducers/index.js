import {combineReducers} from "redux"
import apiCallsInProgress from './apiStatusReducer'
import {taskReducer as tasks} from './taskReducer'
import {experimentReducer as experiments} from './experimentReducer'
import auth from './authReducer'

const rootReducer = combineReducers( {
    auth, apiCallsInProgress, tasks, experiments
} )

export default rootReducer