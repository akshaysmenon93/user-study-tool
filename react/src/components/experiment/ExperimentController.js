import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import * as experimentActions from '../../redux/actions/experimentActions'
import {bindActionCreators} from "redux"
import ExperimentList from './ExperimentList'


const ExperimentController = ( props ) => {
    let renderElement
    const [ page, setPage ] = useState( 0 )
    const [ rowsPerPage, setRowsPerPage ] = useState( 10 )

    useEffect( () => {
        props.actions.experimentActions.getExperiments( page, rowsPerPage ).catch( error => {
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

    if ( props.experiments.length === 0 || props.loading ) {
        renderElement = <p>Loading..</p>
    } else {
        renderElement =
            <ExperimentList
                experiments={props.experiments.data}
                metaData={props.experiments.metadata}
                onPageChange={handleChangePage}
                onRowsChange={handleChangeRowsPerPage}
            />
    }

    return (
        <>
            {renderElement}
        </>
    )
}

function mapStateToProps ( state, ownState ) {
    return {
        experiments: state.experiments,
        loading: state.apiCallsInProgress > 0
    }
}

function mapDispatchToProps ( dispatch ) {
    return {
        actions: {
            experimentActions: bindActionCreators( experimentActions, dispatch )
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( ExperimentController )