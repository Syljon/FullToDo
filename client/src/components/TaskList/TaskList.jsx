import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar
}));

export default function TaskList(props) {
  const classes = useStyles(props);

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {props.taskList.map((text, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
