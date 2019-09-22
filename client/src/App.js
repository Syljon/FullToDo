import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/Header/Header";
import Drawer from "./components/Drawer/Drawer";
import TaskNavigation from "./components/TaskNavigation/TaskNavigation";
import Task from "./components/Task/Task";
import TaskDialog from "./components/TaskDialog/TaskDialog";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import _ from "lodash";
import { getTasks } from "./httpRequests";
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

  const [openStatus, setOpenToggle] = React.useState({
    drawer: false,
    dialog: false
  });

  const [tasksList, setTasksList] = React.useState([]);

  const [selectedTask, setSelectedTask] = React.useState({});

  const colors = ["green", "yellow", "orange", "red", "maroon"];

  function handleOpenToggle(name) {
    setOpenToggle({ ...openStatus, [name]: !openStatus[name] });
  }

  function selectTask(id) {
    const task = _.find(tasksList, { _id: id });
    setSelectedTask(task);
  }

  function updateFetchedTask(newTask) {
    const tasks = [...tasksList, newTask];
    setTasksList(tasks);
  }

  useEffect(() => {
    getTasks()
      .then(res => setTasksList(res))
      .catch(err => console.log(err));
  }, []);

  window.addEventListener("resize", () => {
    if (openStatus.drawer) {
      handleOpenToggle("drawer");
    }
  });

  const drawer = (
    <Drawer
      colors={colors}
      clicked={selectTask}
      tasksList={tasksList}
      setTasksList={setTasksList}
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
      <Task selectedTask={selectedTask}></Task>
      <TaskDialog
        updateFetchedTask={updateFetchedTask}
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

export default App;
