import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ExperimentForm from './ExperimentForm'
import * as experimentActions from '../../redux/actions/experimentActions'
import * as taskActions from '../../redux/actions/taskActions'
import {useHistory} from "react-router-dom"
import {validateExperimentForm} from "../common/FormValidation"
import {toast} from "react-toastify"

const ManageExperiment = ( props ) => {

    const [ selectedTask, setSelectedTask ] = useState( null )
    const [ experiment, setExperiment ] = useState( {...props.experiment} )
    const [ currentTasks, setCurrentTasks ] = useState( [] )
    const [ deletedTasks, setDeletedTasks ] = useState( [] )
    const [ errors, setErrors ] = useState( {} )
    const history = useHistory()

    useEffect( () => {
        props.actions.taskActions.getTasks( 0, 99 ).catch( error => {
            history.push( '/dashboard/experiments' )
        } )

        if ( props.experimentId ) {
            props.actions.experimentActions.getExperimentById( props.experimentId ).then( function ( response ) {
                setExperiment( response.data )
                setCurrentTasks( response.data.tasks )
            } ).catch( error => {
                history.push( '/dashboard/experiments' )
            } )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ props.experimentId ] )

    useEffect( () => {
        if ( selectedTask ) {
            setExperiment( Object.assign( {}, experiment, {tasks: [ ...experiment.tasks, selectedTask ]} ) )
            setSelectedTask( null )
        }
    }, [ selectedTask ] )


    function handleOnChangeAutocomplete ( event, newValue ) {
        setSelectedTask( newValue )
    }

    function handleChange ( {target} ) {
        setExperiment( prevExperiment => ( {
            ...prevExperiment, [ target.name ]: target.value
        } ) )
    }

    function handleCancel () {
        history.push( '/dashboard/experiments' )
    }

    function handleSubmit ( event, isPublish ) {
        event.preventDefault()
        const payload = Object.assign( {}, experiment, {deletedTasks: deletedTasks}, {status: isPublish ? 1 : 0} )

        const _errors = validateExperimentForm( payload )
        setErrors( _errors )

        if ( Object.keys( _errors ).length > 0 ) {
            return
        }

        props.actions.experimentActions.saveExperiment( payload ).then( response => {
            history.push( '/dashboard/experiments' )

            let successMessage

            if ( isPublish ) {
                successMessage = "Experiment published successfully ! "
            } else {
                successMessage = "Experiment " + ( response.status === 201 ? "added  " : "updated " ) + "successfully !"
            }

            toast.success( successMessage,
                {position: toast.POSITION.BOTTOM_RIGHT} )

        } ).catch( error => {
            history.push( '/dashboard/experiments' )
        } )

    }

    function handleTaskDelete ( event, index ) {
        if ( currentTasks.length > 0 ) {
            currentTasks.find( task => task.id === index ? setDeletedTasks( [ ...deletedTasks, task ] ) : false )
        }
        setExperiment(
            Object.assign( {}, experiment, {
                tasks: experiment.tasks.filter( task => {
                    return task.id !== index
                } )
            } ) )
    }

    function handlePublish ( event ) {
        if ( experiment.tasks.length === 0 ) {
            toast.error( "Cannot publish experiment without adding tasks !",
                {position: toast.POSITION.BOTTOM_RIGHT} )
        } else {
            handleSubmit( event, true )
        }
    }

    return (
        props.loading || props.tasks.length === 0 ? <p>Loading...</p> :
            <ExperimentForm
                tasks={props.tasks.data}
                onAutocompleteChange={handleOnChangeAutocomplete}
                selectedTask={selectedTask}
                experiment={experiment}
                errors={errors}
                onTaskDelete={handleTaskDelete}
                onChange={handleChange}
                onSave={handleSubmit}
                onPublish={handlePublish}
                onCancel={handleCancel}
            />
    )
}

const newExperiment = {
    id: null,
    title: "",
    description: "",
    tasks: []
}


function mapStateToProps ( state, ownProps ) {
    const experimentId = ownProps.match.params.id
    return {
        tasks: state.tasks,
        experiment: newExperiment,
        experimentId: experimentId,
        loading: state.apiCallsInProgress > 0
    }
}


function mapDispatchToProps ( dispatch ) {
    return {
        actions: {
            experimentActions: bindActionCreators( experimentActions, dispatch ),
            taskActions: bindActionCreators( taskActions, dispatch )
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( ManageExperiment )
