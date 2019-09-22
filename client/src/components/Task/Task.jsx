import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    width: "100vw",
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export default function Task(props) {
  const classes = useStyles(props);
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {props.selectedTask.title && (
        <h1 style={{ width: "100%", wordBreak: "break-word" }}>
          Title: {props.selectedTask.title}
        </h1>
      )}
      {props.selectedTask.createdDate && (
        <h3>
          Created:{" "}
          {new Date(props.selectedTask.createdDate).toLocaleDateString()}
        </h3>
      )}
      {props.selectedTask.priority && (
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
}
