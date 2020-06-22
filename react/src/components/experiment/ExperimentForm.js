import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete'
import Typography from "@material-ui/core/Typography"
import {makeStyles, ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import SelectedTasks from './SelectedTasks'
import {Grid} from '@material-ui/core'
import {green} from '@material-ui/core/colors'
import PublishSharpIcon from '@material-ui/icons/PublishSharp'
import CancelRoundedIcon from '@material-ui/icons/CancelRounded'

const filter = createFilterOptions()

const theme = createMuiTheme( {
    palette: {
        secondary: green
    },
} )

const ExperimentForm = ( props ) => {

    const useStyles = makeStyles( ( theme ) => ( {
        root: {
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',

        },
        button: {
            margin: theme.spacing( 1 ),
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing( 1 ),
        },
        margin: {
            margin: theme.spacing( 1 )
        }
    } ) )

    const classes = useStyles()

    return (
        <>

            <Typography variant="h3" className={"mb-3"}>
                {props.experiment.status ? "View (published)" : props.experiment.id ? "Edit" : "Add"} Experiment
            </Typography>

            <form noValidate autoComplete="off" onSubmit={props.onSave}>
                <Grid container className={classes.root}>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            autoFocus
                            value={props.experiment.title}
                            onChange={props.onChange}
                            error={props.errors.title ? true : false}
                            helperText={props.errors.title}
                            disabled={props.experiment.status === 1 ? true : false}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            id="description"
                            label="Description"
                            name="description"
                            value={props.experiment.description}
                            onChange={props.onChange}
                            error={props.errors.description ? true : false}
                            helperText={props.errors.description}
                            rows={5}
                            rowsMax={15}
                            disabled={props.experiment.status === 1 ? true : false}
                        />
                    </Grid>

                    <Grid>
                        {!props.experiment.status ? <Grid item>
                            <Autocomplete
                                value={props.selectedTask}
                                onChange={props.onAutocompleteChange}

                                filterOptions={( options, params ) => {
                                    const filtered = filter( options, params )
                                    return filtered
                                }}
                                selectOnFocus
                                clearOnBlur
                                id="search-select-task"
                                options={props.tasks}
                                getOptionLabel={( option ) => {
                                    return option.title
                                }}
                                renderOption={( option ) => option.title}
                                style={{width: 300}}
                                freeSolo
                                renderInput={( params ) => (
                                    <TextField {...params} label="Search tasks" variant="outlined" />
                                )}
                                disabled={props.experiment.status === 1 ? true : false}
                            /></Grid>
                            : null}

                        <Grid item>
                            <SelectedTasks tasks={props.experiment.tasks} status={props.experiment.status}
                                onTaskDelete={props.onTaskDelete} />
                        </Grid>
                    </Grid>

                    <Grid item>
                        {!props.experiment.status ?
                            <>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    size="large"
                                    className={classes.button}
                                    startIcon={<SaveIcon />}
                                >
                                    Save
                                </Button>

                                <ThemeProvider theme={theme}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        className={classes.margin}
                                        startIcon={<CancelRoundedIcon />}
                                        onClick={props.onCancel}
                                    >
                                        CANCEL
                                    </Button>
                                </ThemeProvider>

                                <ThemeProvider theme={theme}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        color="secondary"
                                        className={classes.margin}
                                        startIcon={<PublishSharpIcon />}
                                        onClick={props.onPublish}
                                    >
                                        PUBLISH
                                    </Button>
                                </ThemeProvider>
                            </>
                            :

                            <ThemeProvider theme={theme}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    className={classes.margin}
                                    onClick={props.onCancel}
                                >
                                    BACK
                                 </Button>
                            </ThemeProvider>}
                    </Grid>

                </Grid>
            </form>




        </>

    )
}

export default ExperimentForm