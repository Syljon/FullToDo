import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
import { withSnackbar, useSnackbar } from "notistack";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { getTasks, deleteTask, updateTask } from "./httpRequests";
import orderBy from "./util/orderBy";
import Header from "./components/Header/Header";
import Drawer from "./components/Drawer/Drawer";
import TaskNavigation from "./components/TaskNavigation/TaskNavigation";
import Task from "./components/Task/Task";
import TaskDialog from "./components/TaskDialog/TaskDialog";

import "./App.css";

const useStyles = makeStyles({
  root: {
    display: "flex"
  },
  fabButton: {
    position: "fixed",
    zIndex: 1,
    bottom: "1rem",
    right: "1rem",
    margin: "0 auto"
  }
});

function App() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  const classes = useStyles();

  const drawerWidth = 250;

  const [fetchedTaskList, setFetchedTaskList] = React.useState([]);

  const [showedTasksList, setShowedTasksList] = React.useState([]);

  const [openStatus, setOpenToggle] = React.useState({
    drawer: false,
    dialog: false
  });

  const [drawerValues, setDrawerValues] = React.useState({
    sortBy: "title",
    showAll: false
  });

  const [selectedTask, setSelectedTask] = React.useState({
    title: "",
    priority: 0,
    description: ""
  });

  const [editing, setEditing] = React.useState(false);

  const colors = ["green", "yellow", "orange", "red", "maroon"];

  const { enqueueSnackbar } = useSnackbar();
  function snackbar(message = "test", type = "success") {
    enqueueSnackbar(message, {
      variant: type,
      autoHideDuration: 2000
    });
  }

  useEffect(() => {
    getTasks()
      .then(res => setFetchedTaskList(res))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    updateTaskList(fetchedTaskList);
  }, [drawerValues.showAll, drawerValues.sortBy, fetchedTaskList]);

  function updateTaskList(newList) {
    console.log("Update List");
    let updTable = orderBy(newList, drawerValues.sortBy);
    if (!drawerValues.showAll) {
      updTable = updTable.filter(t => !t.done);
    }
    setShowedTasksList(updTable);
  }

  function handleOpenToggle(name) {
    if (name === "dialog" && openStatus.dialog) {
      setEditing(false);
    }
    setOpenToggle({ ...openStatus, [name]: !openStatus[name] });
  }

  function selectTask(id) {
    const task = _.find(showedTasksList, { _id: id });
    setSelectedTask(task);
    setOpenToggle({ ...openStatus, drawer: false });
  }

  function updateTasks(newTask) {
    let tasks = fetchedTaskList;

    const match = _.find(fetchedTaskList, { _id: newTask._id });
    if (match) {
      tasks = fetchedTaskList.filter(t => t._id !== newTask._id);
      tasks = [...tasks, newTask];
    } else {
      tasks = [...fetchedTaskList, newTask];
    }
    updateTaskList(tasks);
    setSelectedTask({
      title: "",
      priority: 0,
      description: ""
    });
  }

  function editTask() {
    setEditing(!editing);
    handleOpenToggle("dialog");
  }
  function markAsDone(body) {
    body.done = true;
    console.log(body);
    updateTask(body)
      .then(res => {
        updateTaskList(fetchedTaskList);
        setSelectedTask({
          title: "",
          priority: 0,
          description: ""
        });
        snackbar("Task marked as Done");
      })
      .catch(err => console.log(err));
  }

  function removeTaskFromList(newTask) {
    deleteTask(newTask._id)
      .then(res => {
        console.log(newTask);
        let tasks = fetchedTaskList;
        tasks = fetchedTaskList.filter(t => t._id !== newTask._id);
        updateTaskList(tasks);
        setSelectedTask({
          title: "",
          priority: 0,
          description: ""
        });
        snackbar("Task removed");
      })
      .catch(err => console.log(err));
  }

  window.addEventListener("resize", () => {
    if (openStatus.drawer) {
      handleOpenToggle("drawer");
    }
  });

  const drawer = (
    <Drawer
      colors={colors}
      clicked={selectTask}
      tasksList={showedTasksList}
      setDrawerValues={setDrawerValues}
      drawerValues={drawerValues}
      setTasksList={setShowedTasksList}
      selectedTask={selectedTask}
    ></Drawer>
  );
  return (
    <div className={classes.root}>
      <Header
        drawerWidth={drawerWidth}
        drawerToggle={() => handleOpenToggle("drawer")}
      />
      <TaskNavigation
        drawerWidth={drawerWidth}
        drawerToggle={() => handleOpenToggle("drawer")}
        drawer={drawer}
        mobileOpen={openStatus.drawer}
      />
      <Task
        markAsDone={markAsDone}
        removeTaskFromList={removeTaskFromList}
        editTask={editTask}
        selectedTask={selectedTask}
      ></Task>
      <TaskDialog
        snackbar={snackbar}
        editing={editing}
        selectedTask={selectedTask}
        updateTasks={updateTasks}
        open={openStatus.dialog}
        handleClose={() => handleOpenToggle("dialog")}
      />
      <Fab
        color="secondary"
        onClick={() => handleOpenToggle("dialog")}
        className={classes.fabButton}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default withSnackbar(App);
