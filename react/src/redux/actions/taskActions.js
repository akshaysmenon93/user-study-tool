import axios from 'axios'
import {beginApiCall} from './apiStatusActions'
import * as actionTypes from './actionTypes'
import {handleError} from '../../components/common/apiUtils'

const baseUrl = `${ process.env.REACT_APP_API_URL }/tasks`

export function getTasks ( page, rowsPerpage ) {
    return function ( dispatch ) {
        dispatch( beginApiCall() )
        return axios.get( baseUrl + "?page=" + page + "&perPage=" + rowsPerpage ).then( response => {
            dispatch( {type: actionTypes.LOAD_TASKS_SUCCESS, payload: response} )
        }, error => {
            dispatch( {type: actionTypes.API_CALL_ERROR} )
            handleError( error )
        } )
    }
}

export function getTaskById ( id ) {
    return function ( dispatch ) {
        dispatch( beginApiCall() )
        return axios.get( baseUrl + "/" + id ).then( response => {
            dispatch( {type: actionTypes.LOAD_TASK_BY_ID_SUCCESS} )
            return response
        }, error => {
            dispatch( {type: actionTypes.API_CALL_ERROR} )
            handleError( error )
        } )
    }
}

export function saveTask ( task ) {
    return function ( dispatch ) {
        dispatch( beginApiCall() )

        if ( task.id ) {
            return axios.put( baseUrl + "/" + task.id, task ).then( response => {
                dispatch( {type: actionTypes.CREATE_TASK_SUCCESS} )
                return response
            }, error => {
                dispatch( {type: actionTypes.API_CALL_ERROR} )
                handleError( error )
            } )
        } else {
            return axios.post( baseUrl, task ).then( response => {
                dispatch( {type: actionTypes.UPDATE_TASK_SUCCESS} )
                return response
            }, error => {
                dispatch( {type: actionTypes.API_CALL_ERROR} )
                handleError( error )
            } )
        }
    }

}

export function deleteTask ( task ) {
    return function ( dispatch ) {
        dispatch( beginApiCall() )
        return axios.delete( baseUrl + "/" + task.id ).then( response => {
            dispatch( {type: actionTypes.DELETE_TASK_SUCCESS} )
            return response
        }, error => {
            dispatch( {type: actionTypes.API_CALL_ERROR} )
            handleError( error )
        } )
    }
}