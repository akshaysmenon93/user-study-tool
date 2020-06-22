import * as types from '../actions/actionTypes'
import initialState from './initialState'

export function experimentReducer ( state = initialState.experiments, action ) {
    switch ( action.type ) {
        case types.LOAD_EXPERIMENTS_SUCCESS:
            return action.payload.data
        default:
            return state
    }
}
