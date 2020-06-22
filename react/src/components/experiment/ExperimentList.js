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
import {Link, useRouteMatch, useHistory} from 'react-router-dom'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Grid from '@material-ui/core/Grid'
import VerifiedUserTwoToneIcon from '@material-ui/icons/VerifiedUserTwoTone'
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone'

function ExperimentList ( props ) {
    let {path} = useRouteMatch()
    let history = useHistory()

    const rows = props.experiments

    const useStyles = makeStyles( ( theme ) => ( {
        root: {
            width: '100%',
        },
        container: {
            maxHeight: 440,
        },
        heading: {
            fontSize: theme.typography.pxToRem( 15 ),
            fontWeight: theme.typography.fontWeightRegular,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem( 15 ),
            color: theme.palette.text.secondary,
        },
        expansionContent: {
            flexDirection: "row",
            alignContent: "space-between"
        }
    } ) )

    const classes = useStyles()

    const [ expanded, setExpanded ] = React.useState( false )

    const handleChange = ( panel ) => ( event, isExpanded ) => {
        setExpanded( isExpanded ? panel : false )
    }

    return (
        <>
            <Grid container spacing={1}>
                <Grid container item xs={1} spacing={1} justify="flex-start">
                    <Fab color="primary" aria-label="add" style={{float: 'left', marginRight: '5%'}} onClick={() => history.push( `${ path }/experiment` )}>
                        <AddIcon />
                    </Fab>
                </Grid>
                <Grid container item xs={10} spacing={1}>
                    <Typography variant="h3" className={"mb-3"}>Experiments</Typography>
                </Grid>
            </Grid>

            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>

                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {

                                rows.map( ( row ) => {
                                    return (

                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell>
                                                <ExpansionPanel expanded={expanded === row.id} onChange={handleChange( row.id )}>
                                                    <ExpansionPanelSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1a-content"
                                                        id="panel1a-header"
                                                    >
                                                        <Grid container spacing={2}>
                                                            <Grid item>
                                                                {row.status ? <VerifiedUserTwoToneIcon /> : <EditTwoToneIcon />}
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography className={classes.secondaryHeading}>Title :  </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography className={classes.heading}>{row.title}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>

                                                        <Grid container spacing={2}>
                                                            <Grid item xs={10} zeroMinWidth>
                                                                <Typography>
                                                                    {row.description}
                                                                </Typography>
                                                            </Grid>

                                                            <Grid item >
                                                                <Link to={`${ path }/experiment/${ row.id }`}>
                                                                    {row.status ? "View" : "Edit"}
                                                                </Link>
                                                            </Grid>
                                                        </Grid>

                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                            </TableCell>
                                        </TableRow>
                                    )
                                } )
                            }

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
        </>
    )
}

export default ExperimentList