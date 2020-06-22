import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {useHistory} from "react-router-dom"
import TaskForm from './TaskForm'
import * as taskActions from '../../redux/actions/taskActions'
import {validateTaskForm} from "../common/FormValidation"
import {toast} from "react-toastify"


function ManageTask ( props ) {

    const [ errors, setErrors ] = useState( {} )
    const [ task, setTask ] = useState( {...props.task} )

    const history = useHistory()

    useEffect( () => {
        if ( props.taskId ) {
            props.actions.taskActions.getTaskById( props.taskId ).then( function ( response ) {
                setTask( response.data )
            } ).catch( error => {
                history.push( '/dashboard/tasks' )
            } )
        }
    }, [ props.taskId, history, props.actions.taskActions ] )

    function handleChange ( {target} ) {
        setTask( prevTask => ( {
            ...prevTask, [ target.name ]: target.value
        } ) )
    }


    function handleSubmit ( event ) {
        event.preventDefault()
        let _errors = validateTaskForm( task )
        setErrors( _errors )

        if ( Object.keys( _errors ).length > 0 ) {
            return
        }

        props.actions.taskActions.saveTask( task ).then( ( response ) => {
            history.push( '/dashboard/tasks' )
            toast.success( "Task " + ( response.config.method === "post" ? "added  " : "updated " ) + "successfully !",
                {position: toast.POSITION.BOTTOM_RIGHT} )
        } ).catch( error => {
            history.push( '/dashboard/tasks' )
        } )
    }

    function handleDelete () {
        props.actions.taskActions.deleteTask( task ).then( function ( response ) {
            history.push( '/dashboard/tasks' )
            toast.success( "Task deleted successfully !",
                {position: toast.POSITION.BOTTOM_RIGHT} )
        } ).catch( error => {
            history.push( '/dashboard/tasks' )
        } )
    }

    function handleBack () {
        history.push( '/dashboard/tasks' )
    }

    return (

        <TaskForm
            task={task}
            onSave={handleSubmit}
            onChange={handleChange}
            errors={errors}
            onDelete={handleDelete}
            onBack={handleBack}
        />

    )
}

const newTask = {
    id: null,
    title: "",
    description: "",
    link: "",
    readOnly: false
}

function mapStateToProps ( state, ownProps ) {
    const taskId = ownProps.match.params.id

    return {
        task: newTask,
        tasks: state.tasks.data,
        taskId: taskId,
        loading: state.apiCallsInProgress > 0,

    }
}

function mapDispatchToProps ( dispatch ) {
    return {
        actions: {
            taskActions: bindActionCreators( taskActions, dispatch )
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( ManageTask )
