import React from 'react'
import Typography from "@material-ui/core/Typography"
import {makeStyles, ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import {red} from '@material-ui/core/colors'
import DeleteIcon from '@material-ui/icons/Delete'
import Grid from "@material-ui/core/Grid"

const TaskForm = ( props ) => {

    const useStyles = makeStyles( ( theme ) => ( {
        button: {
            margin: theme.spacing( 1 ),
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing( 1 ),
        }
    } ) )

    const redTheme = createMuiTheme( {
        palette: {
            secondary: red,
        }
    } )

    const classes = useStyles()

    return (
        <>
            <Typography variant="h3" className={"mb-3"}>
                {props.task.readOnly ? "View" : props.task.id ? "Edit" : "Add"} Task
            </Typography>
            {props.task.readOnly ? <p>This task has been assigned to an experiment</p> : null}
            <form noValidate autoComplete="off" onSubmit={props.onSave}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoFocus
                    value={props.task.title}
                    onChange={props.onChange}
                    error={props.errors.title ? true : false}
                    helperText={props.errors.title}
                    disabled={props.task.readOnly}
                />


                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    id="description"
                    label="Description"
                    name="description"
                    value={props.task.description}
                    onChange={props.onChange}
                    error={props.errors.description ? true : false}
                    helperText={props.errors.description}
                    rows={5}
                    rowsMax={15}
                    disabled={props.task.readOnly}
                />


                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="link"
                    label="Task Link"
                    name="link"
                    value={props.task.link}
                    onChange={props.onChange}
                    error={props.errors.link ? true : false}
                    helperText={props.errors.link}
                    disabled={props.task.readOnly}
                />


                <Grid item>
                    {props.task.readOnly ?

                        <Button
                            variant="contained"
                            size="large"
                            className={classes.margin}
                            onClick={props.onBack}
                        >
                            Back
                        </Button>

                        :

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



                            <Button
                                variant="contained"
                                size="large"
                                className={classes.margin}
                                onClick={props.onBack}
                            >
                                Cancel
                                </Button>


                            {props.task.id ? <ThemeProvider theme={redTheme}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<DeleteIcon />}
                                    onClick={props.onDelete}
                                >
                                    Delete
                                    </Button>
                            </ThemeProvider> : null}

                        </>
                    }
                </Grid>


            </form>
        </>
    )
}

export default TaskForm