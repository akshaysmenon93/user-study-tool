import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {useHistory, useRouteMatch} from 'react-router-dom'
import * as taskActions from '../../redux/actions/taskActions'
import {bindActionCreators} from "redux"
import Typography from "@material-ui/core/Typography"
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import TaskList from './TaskList'
import Grid from "@material-ui/core/Grid"


function TaskController ( props ) {

    let history = useHistory()
    let {path} = useRouteMatch()
    let renderElement

    const [ page, setPage ] = useState( 0 )
    const [ rowsPerPage, setRowsPerPage ] = useState( 10 )

    useEffect( () => {
        props.actions.taskActions.getTasks( page, rowsPerPage ).catch( error => {
            console.log( error )
        } )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ page, rowsPerPage ] )

    const handleChangePage = ( event, newPage ) => {
        setPage( newPage + 1 )
    }

    const handleChangeRowsPerPage = ( event ) => {
        setRowsPerPage( event.target.value )
    }

    if ( props.tasks.length === 0 || props.loading ) {
        renderElement = <p>Loading..</p>
    } else {
        renderElement =
            <TaskList
                tasks={props.tasks.data}
                metaData={props.tasks.metadata}
                onPageChange={handleChangePage}
                onRowsChange={handleChangeRowsPerPage}
            />
    }

    return (
        <>
            <Grid container spacing={1}>

                <Grid container item xs={1} spacing={1} justify="flex-start">
                    <Fab color="primary" aria-label="add" onClick={() => history.push( `${ path }/task` )}>
                        <AddIcon />
                    </Fab>
                </Grid>

                <Grid container item xs={10} spacing={1}>
                    <Typography variant="h3" className={"mb-3"}>Tasks</Typography>
                </Grid>
            </Grid>

            {renderElement}


        </>
    )


}

function mapStateToProps ( state, ownProps ) {
    return {
        tasks: state.tasks,
        loading: state.apiCallsInProgress > 0
    }
}

function mapDispatchToProps ( dispatch ) {
    return {
        actions: {
            taskActions: bindActionCreators( taskActions, dispatch )
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( TaskController )