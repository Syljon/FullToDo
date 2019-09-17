import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles(theme => ({
  drawer: props => ({
    [theme.breakpoints.up("sm")]: {
      width: props.drawerWidth,
      flexShrink: 0
    }
  }),
  drawerPaper: props => ({
    width: props.drawerWidth
  })
}));

export default function TaskNavigation(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.drawer}>
      {/* Mobile */}
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          open={props.mobileOpen}
          onClose={props.drawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true
          }}
        >
          {props.drawer}
        </Drawer>
      </Hidden>
      {/* Desktop */}
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          {props.drawer}
        </Drawer>
      </Hidden>
    </div>
  );
}
