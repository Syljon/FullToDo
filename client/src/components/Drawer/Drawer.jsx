import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import orderBy from "../../util/orderBy";

const useStyles = makeStyles(theme => ({
  toolbar: {
    padding: "10px",
    textAlign: "center"
  }
}));

export default function Drawer(props) {
  const classes = useStyles(props);

  const [values, setValues] = React.useState({
    sortBy: ""
  });

  function handleChange(event) {
    orderBy(props.tasksList, event.target.value, props.setTasksList);
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  }
  return (
    <div>
      <div className={classes.toolbar}>
        <FormControl className={classes.formControl}>
          <Select
            value={values.sortBy}
            onChange={handleChange}
            name="sortBy"
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value="" disabled>
              Order by
            </MenuItem>
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="priority">Priority</MenuItem>
            <MenuItem value="createdDate">Create</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Divider />
      <List>
        {props.tasksList.map(({ _id, title, priority }) => {
          return (
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
                style={{ wordBreak: "break-all" }}
                primary={title}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
