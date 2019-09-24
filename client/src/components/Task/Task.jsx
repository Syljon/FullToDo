import React from "react";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    width: "100vw",
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  }
}));

const Task = props => {
  const classes = useStyles(props);
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {props.selectedTask.title && (
        <h1 style={{ width: "100%", wordBreak: "break-word" }}>
          Title: {props.selectedTask.title}
        </h1>
      )}
      {props.selectedTask.title && (
        <>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => props.editTask(props.selectedTask)}
          >
            Edit
            <EditIcon className={classes.rightIcon} />
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => props.removeTaskFromList(props.selectedTask)}
          >
            Delete
            <DeleteIcon className={classes.rightIcon} />
          </Button>{" "}
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => props.markAsDone(props.selectedTask)}
          >
            Done
            <EditIcon className={classes.rightIcon} />
          </Button>
        </>
      )}
      {props.selectedTask.createdDate && (
        <h3>
          Created:{" "}
          {new Date(props.selectedTask.createdDate).toLocaleDateString()}
        </h3>
      )}
      {props.selectedTask.priority !== 0 && (
        <h3>Priority: {props.selectedTask.priority}</h3>
      )}
      <Typography paragraph style={{ width: "100%", wordBreak: "break-word" }}>
        {props.selectedTask.description &&
          props.selectedTask.description.split("\n").map((i, index) => {
            return (
              <React.Fragment key={index}>
                {i}
                <br />
              </React.Fragment>
            );
          })}
      </Typography>
    </main>
  );
};

export default Task;
