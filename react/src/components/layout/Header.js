import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import {AccountCircle} from "@material-ui/icons"
import Menu from "@material-ui/core/Menu/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import AppBar from "@material-ui/core/AppBar/AppBar"
import React from "react"
import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles( ( theme ) => ( {
  title: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
} ) )

const Header = ( props ) => {

  const classes = useStyles()
  const [ anchorEl, setAnchorEl ] = React.useState( null )
  const open = Boolean( anchorEl )

  const handleMenu = ( event ) => {
    setAnchorEl( event.currentTarget )
  }

  const handleClose = () => {
    setAnchorEl( null )
  }

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          User Study Tool
        </Typography>
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={props.onLogout}>Log Out</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header