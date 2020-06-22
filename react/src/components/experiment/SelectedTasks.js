import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import AssignmentIcon from '@material-ui/icons/Assignment'

const SelectedTasks = ( props ) => {



    let renderElement

    const useStyles = makeStyles( ( theme ) => ( {
        root: {
            flexGrow: 1,
            maxWidth: 752,
        },
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            margin: theme.spacing( 4, 0, 2 ),
        },
    } ) )

    const classes = useStyles()

    if ( props.tasks.length === 0 ) {
        renderElement = <p>No tasks added to experiment. Added tasks will be displayed here</p>
    } else {
        renderElement =
            <Grid item xs={12} md={6}>
                <Typography variant="h6" className={classes.title}>
                    Tasks currently present in this experiment
                </Typography>
                <div className={classes.demo}>
                    <List>

                        {
                            props.tasks.map( ( task ) =>

                                <ListItem key={task.id}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AssignmentIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={task.title}
                                        secondary={task.link}
                                    />
                                    <ListItemSecondaryAction>
                                        {!props.status ?
                                            <IconButton edge="end" aria-label="delete"
                                                onClick={( event ) => props.onTaskDelete( event, task.id )}>
                                                <DeleteIcon />
                                            </IconButton> : null
                                        }
                                    </ListItemSecondaryAction>
                                </ListItem>,
                            )}
                    </List>
                </div>
            </Grid>
    }

    return (
        <>
            {renderElement}
        </>
    )
}

export default SelectedTasks