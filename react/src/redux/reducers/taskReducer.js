import * as types from '../actions/actionTypes'
import initialState from './initialState'

export function taskReducer ( state = initialState.tasks, action ) {
    switch ( action.type ) {
        case types.LOAD_TASKS_SUCCESS:
            return action.payload.data
        default:
            return state
    }
}

// export function selectedTaskReducer ( state = initialState.selectedTask, action ) {
//     switch ( action.type ) {
//         case types.LOAD_TASK_BY_ID_SUCCESS:
//             return action.payload.data
//         default:
//             return state
//     }
// }