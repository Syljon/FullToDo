import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { createTask, updateTask } from "../../httpRequests";
import validateForm from "../../util/validation";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles({
  header: { padding: "16px 24px 0" },
  actions: {
    padding: "15px 0",
    justifyContent: "center"
  },
  container: {
    width: "100%",
    padding: "4px 24px"
  },
  formControl: {
    margin: "20px auto"
  },
  radioGroup: { flexDirection: "row" }
});
const TaskDialog = props => {
  const classes = useStyles(props);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [values, setValues] = React.useState({
    title: "",
    priority: 0,
    description: ""
  });

  const [formErrors, setFormErrors] = React.useState({
    errors: {},
    isValid: false
  });
  useEffect(() => {
    if (props.editing) {
      setValues(props.selectedTask);
    }
  }, [props.editing, props.selectedTask]);
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const submitForm = e => {
    e.preventDefault();
    const body = { ...values };
    const results = validateForm(body);
    setFormErrors({
      ...formErrors,
      errors: results.errors,
      isValid: results.isValid
    });
    if (results.isValid) {
      if (props.editing) {
        updateTask(body)
          .then(res => {
            props.updateTaskList(res);
            props.snackbar("Update");
            props.handleClose();
          })
          .catch(err => console.log(err));
      } else {
        createTask(body)
          .then(res => {
            props.updateTaskList(res);
            props.snackbar("Create");
            props.handleClose();
          })
          .catch(err => console.log(err));
      }
    }
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.handleClose}
      >
        <DialogTitle className={classes.header}>{"Add New Task"}</DialogTitle>
        <DialogContent className={classes.container}>
          <form noValidate onSubmit={submitForm} autoComplete="off">
            <TextField
              error={formErrors.errors.title ? true : false}
              id="title"
              label="Title"
              className={classes.textField}
              value={values.title}
              fullWidth
              onChange={handleChange("title")}
            />
            <FormHelperText error={formErrors.errors.title ? true : false}>
              {formErrors.errors.title}
            </FormHelperText>
            <TextField
              id="standard"
              label="Description"
              multiline
              fullWidth
              rows="4"
              rowsMax="4"
              value={values.description}
              onChange={handleChange("description")}
              className={classes.textField}
            />
            <FormControl
              error={formErrors.errors.priority ? true : false}
              component="fieldset"
              className={classes.formControl}
            >
              <FormLabel component="legend">Priority</FormLabel>
              <RadioGroup
                className={classes.radioGroup}
                aria-label="gender"
                name="gender1"
                value={values.priority.toString()}
                onChange={handleChange("priority")}
              >
                {["1", "2", "3", "4", "5"].map(p => (
                  <FormControlLabel
                    key={p}
                    value={p}
                    control={<Radio />}
                    label={p}
                    labelPlacement="bottom"
                  />
                ))}
              </RadioGroup>
              <FormHelperText error={formErrors.errors.priority ? true : false}>
                {formErrors.errors.priority}
              </FormHelperText>
            </FormControl>
            <DialogActions className={classes.actions}>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                type="submit"
              >
                Create
              </Button>
              <Button
                onClick={props.handleClose}
                variant="contained"
                size="medium"
                color="inherit"
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default TaskDialog;
