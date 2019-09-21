import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export default function Task(props) {
  const classes = useStyles(props);
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {props.showedTask.title && <h1>Title: {props.showedTask.title}</h1>}
      {props.showedTask.createdDate && (
        <h3>
          Created: {new Date(props.showedTask.createdDate).toLocaleDateString()}
        </h3>
      )}
      <Typography paragraph>
        {props.showedTask.description &&
          props.showedTask.description.split("\n").map(i => {
            return (
              <>
                {i}
                <br />
              </>
            );
          })}
      </Typography>
    </main>
  );
}
