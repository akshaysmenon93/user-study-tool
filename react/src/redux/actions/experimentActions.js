import axios from 'axios'
import {beginApiCall} from './apiStatusActions'
import * as actionTypes from './actionTypes'
import {handleError} from "../../components/common/apiUtils"

const baseUrl = `${ process.env.REACT_APP_API_URL }/experiments`

export function getExperiments ( page, rowsPerpage ) {
    return function ( dispatch ) {
        dispatch( beginApiCall() )
        return axios.get( baseUrl + "?page=" + page + "&perPage=" + rowsPerpage ).then( response => {
            dispatch( {type: actionTypes.LOAD_EXPERIMENTS_SUCCESS, payload: response} )
            return response
        }, error => {
            dispatch( {type: actionTypes.API_CALL_ERROR} )
            handleError( error )
        } )
    }
}

export function getExperimentById ( id ) {
    return function ( dispatch ) {
        dispatch( beginApiCall() )
        return axios.get( baseUrl + "/" + id ).then( response => {
            dispatch( {type: actionTypes.LOAD_EXPERIMENT_BY_ID_SUCCESS} )
            return response
        }, error => {
            dispatch( {type: actionTypes.API_CALL_ERROR} )
            handleError( error )
        } )
    }
}

export function saveExperiment ( experiment ) {
    return function ( dispatch ) {
        dispatch( beginApiCall() )

        if ( experiment.id ) {
            return axios.post( baseUrl + "/" + experiment.id, experiment ).then( response => {
                dispatch( {type: actionTypes.UPDATE_EXPERIMENT_SUCCESS} )
                return response
            }, error => {
                dispatch( {type: actionTypes.API_CALL_ERROR} )
                handleError( error )
            } )
        } else {
            return axios.post( baseUrl, experiment ).then( response => {
                dispatch( {type: actionTypes.CREATE_EXPERIMENT_SUCCESS} )
                return response
            }, error => {
                dispatch( {type: actionTypes.API_CALL_ERROR} )
                handleError( error )
            } )
        }
    }

}