import React, {useState, useEffect} from 'react'
import LoginForm from './LoginForm'
import {useHistory} from "react-router-dom"
import {validateLogin} from '../common/FormValidation'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as authActions from '../../redux/actions/authActions'

const LoginController = ( props ) => {

    let history = useHistory()
    const [ userCredentials, setUserCredentials ] = useState( {
        email: "",
        password: ""
    } )
    const [ attemptLogin, setAttemptLogin ] = useState( false )
    const [ errors, setErrors ] = useState( {
        email: "",
        password: ""
    } )

    useEffect( () => {
        if ( props.auth.isAuthenticated ) {
            history.push( '/dashboard' )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )


    function handleSubmit ( event ) {
        event.preventDefault()
        const _errors = validateLogin( userCredentials )
        setErrors( _errors )
        if ( Object.keys( _errors ).length !== 0 ) {
            return
        }


        setAttemptLogin( true )
        props.actions.authActions.login( userCredentials ).then( ( response ) => {
            setAttemptLogin( false )
            history.push( '/dashboard' )
        } ).catch( error => {
            setAttemptLogin( false )
        } )



    }

    function handleChange ( {target} ) {
        setUserCredentials( prevCredentials => (
            {...prevCredentials, [ target.name ]: target.value}
        ) )
    }

    return (

        <LoginForm
            user={userCredentials}
            errors={errors}
            onChange={handleChange}
            onSave={handleSubmit}
            loginAttempt={attemptLogin}
        />

    )
}

function mapStateToProps ( state, ownProps ) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps ( dispatch ) {
    return {
        actions: {
            authActions: bindActionCreators( authActions, dispatch )
        }
    }
}


export default connect( mapStateToProps, mapDispatchToProps )( LoginController )