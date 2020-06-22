import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'

//const isEmpty = require( "is-empty" )

export default function ( state = initialState.auth, action ) {
    switch ( action.type ) {
        case actionTypes.SET_CURRENT_USER:
            return {...state, isAuthenticated: action.payload.length > 0}
        default:
            return state
    }
}