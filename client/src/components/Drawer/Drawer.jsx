import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import orderBy from "../../util/orderBy";

const useStyles = makeStyles(theme => ({
  toolbar: {
    padding: "10px",
    textAlign: "center"
  }
}));

export default function Drawer(props) {
  const classes = useStyles(props);

  const showAll = event => {
    props.setDrawerValues({
      ...props.drawerValues,
      showAll: !props.drawerValues.showAll
    });
  };
  function handleChange(event) {
    props.setTasksList(orderBy(props.tasksList, event.target.value));
    props.setDrawerValues({
      ...props.drawerValues,
      sortBy: event.target.value
    });
  }
  return (
    <div>
      <div className={classes.toolbar}>
        <FormControl>
          <Select
            value={props.drawerValues.sortBy}
            onChange={handleChange}
            name="sortBy"
            displayEmpty
          >
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="priority">Priority</MenuItem>
            <MenuItem value="createdDate">Create</MenuItem>
          </Select>{" "}
        </FormControl>
        <br></br>
        <FormControlLabel
          control={
            <Checkbox checked={props.drawerValues.showAll} onChange={showAll} />
          }
          label="Show All"
        />
      </div>
      <Divider />
      <List>
        {props.tasksList.map(({ _id, title, priority, done }) => (
          <ListItem
            onClick={() => {
              props.clicked(_id);
            }}
            selected={
              props.selectedTask && props.selectedTask._id === _id
                ? true
                : false
            }
            button
            key={_id}
            style={{ borderLeft: "5px solid " + props.colors[priority - 1] }}
          >
            <ListItemText
              style={{
                wordBreak: "break-all",
                textDecoration: done ? "line-through" : "none"
              }}
              primary={title}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
