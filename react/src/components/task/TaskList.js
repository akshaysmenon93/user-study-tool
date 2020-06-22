import React from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import {makeStyles} from '@material-ui/core/styles'
import {Link, useRouteMatch} from 'react-router-dom'

function TaskList ( props ) {
    let {path} = useRouteMatch()

    const columns = [
        {id: 'title', label: 'Title', minWidth: 170},
        {id: 'description', label: 'Description', minWidth: 100},
        {id: 'link', label: 'Link', minWidth: 170}
    ]

    const rows = props.tasks

    const useStyles = makeStyles( {
        root: {
            width: '100%',
        },
        container: {
            maxHeight: 440,
        },
    } )

    const classes = useStyles()



    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>

                        <TableRow>
                            {columns.map( ( column ) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ) )}
                            <TableCell> Action  </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {

                            rows.map( ( row ) => {
                                return (

                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map( ( column ) => {
                                            const value = row[ column.id ]
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            )
                                        } )}

                                        <TableCell>
                                            <Link to={`${ path }/task/${ row.id }`}>
                                                {row.readOnly ? "View" : "Edit"}
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                )
                            } )}

                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[ 5, 10, 25, 50, 100 ]}
                component="div"
                count={props.metaData.total}
                rowsPerPage={props.metaData.perPage}
                page={props.metaData.page - 1}
                onChangePage={props.onPageChange}
                onChangeRowsPerPage={props.onRowsChange}
            />

        </Paper>
    )
}

export default TaskList