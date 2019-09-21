import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  toolbar: {
    padding: "10px",
    textAlign: "center"
  }
}));

export default function TaskList(props) {
  const classes = useStyles(props);

  const [values, setValues] = React.useState({
    sortBy: ""
  });

  function handleChange(event) {
    console.log(event.target.value);
    props.orderBy(event.target.value);
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
        {props.taskList.map(({ _id, title }) => (
          <ListItem
            onClick={() => {
              props.clicked(_id);
            }}
            selected={
              props.showedTask && props.showedTask._id === _id ? true : false
            }
            button
            key={_id}
          >
            <ListItemText style={{ wordBreak: "break-all" }} primary={title} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
