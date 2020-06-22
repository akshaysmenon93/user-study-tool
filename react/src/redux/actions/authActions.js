import axios from "axios"
import setAuthToken from "../../components/common/setAuthToken"
import {beginApiCall} from "./apiStatusActions"
import {handleError} from "../../components/common/apiUtils"
import * as actionTypes from "./actionTypes"


const baseUrl = `${ process.env.REACT_APP_API_URL }`


export function login ( userData ) {
    return function ( dispatch ) {
        dispatch( beginApiCall() )
        return axios.post( baseUrl + "/login", userData ).then( response => {
            // save token to local storage
            localStorage.setItem( 'jwtTokenUserStudy', response.data.accessToken )
            //set the token for all future request headers. 
            setAuthToken( response.data.accessToken )
            dispatch( {type: actionTypes.LOGIN_SUCCESS} )
            //set user data to store
            dispatch( {type: actionTypes.SET_CURRENT_USER, payload: response.data.accessToken} )
            return response
        }, error => {
            dispatch( {type: actionTypes.API_CALL_ERROR} )
            handleError( error )
        } )
    }
}

export function logout ( history ) {
    return function ( dispatch ) {
        localStorage.removeItem( "jwtTokenUserStudy" )
        setAuthToken( false )
        dispatch( setCurrentUser( {} ) )
        history.push( '/' )
    }
}

export const setCurrentUser = decoded => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload: decoded
    }
}