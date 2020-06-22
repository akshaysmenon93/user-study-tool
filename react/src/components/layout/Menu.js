import React from "react"
import Toolbar from "@material-ui/core/Toolbar"
import Box from "@material-ui/core/Box"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon"
import {AccountTree, AssignmentTurnedInOutlined, House} from "@material-ui/icons"
import ListItemText from "@material-ui/core/ListItemText/ListItemText"
import Drawer from "@material-ui/core/Drawer/Drawer"
import {makeStyles} from "@material-ui/core/styles"
import {useRouteMatch, Link as RouterLink} from "react-router-dom"


const drawerWidth = 240
const useStyles = makeStyles( ( theme ) => ( {
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  }
} ) )

const Menu = ( props ) => {
  const classes = useStyles()
  let {url} = useRouteMatch()

  return (
    <>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        PaperProps={{elevation: 3}}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />

        <Box className={classes.drawerContainer}>
          <List>

            <RouterLink to={`${ url }/home`}>
              <ListItem button key={"home"} underline="none">
                <ListItemIcon><House /></ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
            </RouterLink>

            <RouterLink to={`${ url }/tasks`}>
              <ListItem button key={"tasks"} underline="none">
                <ListItemIcon><AssignmentTurnedInOutlined /></ListItemIcon>
                <ListItemText primary={"Tasks"} />
              </ListItem>
            </RouterLink>

            <RouterLink to={`${ url }/experiments`}>
              <ListItem button key={"experiments"} underline="none">
                <ListItemIcon><AccountTree /></ListItemIcon>
                <ListItemText primary={"Experiments"} />
              </ListItem>
            </RouterLink>

          </List>
        </Box>



      </Drawer>

    </>
  )
}

export default Menu