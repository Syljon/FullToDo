import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: props => ({
    marginLeft: props.drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${props.drawerWidth}px)`
    }
  }),
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  }
}));

export default function Header(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={props.drawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">ToDo List</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
